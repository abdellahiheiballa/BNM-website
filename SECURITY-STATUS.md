# Pre-production Security Status

**Project:** BNM Website  
**Report reviewed:** OWASP ZAP pre-production report, 2 September 2026  
**Status date:** 3 September 2026  
**Decision:** **Not approved for public production yet**

## Executive status

The main Nginx hardening work is implemented in the repository and has been tested locally with a successful frontend build. The server-side checks also confirmed that Nginx starts successfully and that `/test.php` and `/server-info` return `404` after the corrected configuration was deployed.

The application is not yet fully closed against the report because the trusted domain certificate, enforcing CSP, local font files, and final ZAP verification remain open.

## Findings status

| Report item | Status | Evidence / next action |
|---|---|---|
| Identify Nginx version | Done | Server reported `nginx/1.30.4`. Vendor CVE/support sign-off remains a release check. |
| Upgrade Nginx | Done | Frontend was rebuilt from `nginx:stable-alpine`; approved image digest is recorded below. |
| Hide Nginx version | Done | `server_tokens off;`; responses show `Server: nginx` without a version. |
| Remove `/test.php` | Done | Exact Nginx location returns `404`; no file was found in the deployed static tree. |
| Restrict `/server-info` | Done | Exact Nginx location returns `404`. |
| CSP report-only | Done | `Content-Security-Policy-Report-Only` is configured globally. Review browser/ZAP violations. |
| Enforcing CSP | Open | Change to `Content-Security-Policy` only after violations are reviewed and the site works without unsafe directives. |
| Anti-clickjacking | Done | `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'` are configured. |
| `X-Content-Type-Options` | Done | `nosniff` is configured with `always`. |
| `Referrer-Policy` | Done | `strict-origin-when-cross-origin` is configured with `always`. |
| HSTS | Open, production blocker | Add only after `bnm.mr` uses a trusted certificate and HTTPS is permanently available. |
| Google Fonts removal | Partially done | Google font links were removed from `index.html`; Inter still needs to be supplied as local `.woff2` files and declared with `@font-face`. |
| External dependency audit | Open | Review social links, Click services, OpenStreetMap tiles, APIs, scripts, CSS, and icons against institutional policy. Localize required dependencies where required. |
| SRI | Open / conditional | Local bundled scripts and styles do not need SRI. Add SHA-384 `integrity` and `crossorigin="anonymous"` to any unavoidable external script or stylesheet. |
| Database/API exposure | Open | The active server output still publishes ports 3000 and 5432. Remove them from the active Compose configuration and verify again. |
| Final ZAP scan | Open | Existing scan had `FAIL-NEW: 0` but 8 warnings and was run before all latest corrections. Run a new scan after deployment. |

## Remaining production blockers

- [x] Identify Nginx version, upgrade to `nginx:stable-alpine`, and hide the version. Current observed version: `1.30.4`; image digest: `sha256:02b1b2a0445514891a14aa371845f6085d5d9d10d385b30d6aad606a50a29a05`.
- [ ] Obtain security-owner confirmation that Nginx 1.30.4 and the pinned digest have no unacceptable known CVEs.
- [ ] Configure public DNS for `bnm.mr` and router forwarding of TCP 80/443 to `192.168.1.200`.
- [ ] Obtain and install a trusted Let’s Encrypt certificate for `bnm.mr`.
- [ ] Replace the self-signed certificate mounts with the successful Let’s Encrypt certificate paths.
- [ ] Add HSTS after trusted HTTPS is confirmed.
- [x] Configure CSP in `Content-Security-Policy-Report-Only` mode.
- [ ] Review CSP report-only violations and switch to enforcing CSP.
- [ ] Add local Inter font files and confirm there are no requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
- [ ] Complete the external dependency and SRI review.
- [ ] Run and review a fresh OWASP ZAP scan over the production-like HTTPS URL.
- [ ] Remove public ports 3000 and 5432 from the active server Compose configuration.
- [ ] Close all High and Medium findings and obtain production approval.

## Completed work

- [x] Nginx configuration syntax validated successfully with `nginx -t`.
- [x] Nginx version hidden: responses show `Server: nginx` without the version number.
- [x] `/test.php` returns `404`.
- [x] `/server-info` returns `404`.
- [x] `/api/stats` returns `200` through the Nginx HTTPS proxy.
- [x] `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` verified in HTTPS responses.
- [x] Existing ZAP baseline completed with `FAIL-NEW: 0`; a final post-change scan is still required.

## Release verification commands

Run on the Linux server from `~/BNM-website`:

```bash
# Configuration and service status
docker compose config
docker compose up -d --build --force-recreate
docker compose ps
docker compose exec frontend nginx -t
docker compose exec frontend nginx -v

# Sensitive routes must not fall through to the SPA
for path in /test.php /server-info; do
  curl -k -s -o /dev/null -w "$path HTTP %{http_code}\n" \
    "https://127.0.0.1$path"
done

# Headers must be present on the HTTPS entrypoint
curl -k -sI https://127.0.0.1 | \
  grep -Ei '^(server|content-security|x-frame|x-content|referrer-policy|strict-transport):'

# Source and built output must contain no Google Fonts references
grep -RniE 'fonts\.googleapis|fonts\.gstatic' \
  artifacts/bnm-site/src artifacts/bnm-site/public || true

docker compose exec frontend sh -c \
  "grep -RniE 'fonts\\.googleapis|fonts\\.gstatic' /usr/share/nginx/html || true"

# Final ZAP report
mkdir -p zap-results
docker run --rm --network host \
  -v "$PWD/zap-results:/zap/wrk/:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t https://bnm.mr -r zap-report-final.html -I
```

## Release decision

Do not approve public production until every item under **Remaining production blockers** is checked, the final ZAP report is reviewed, and the security owner signs off.
