- [x] Add global Express error handler to `artifacts/api-server/src/app.ts`
- [x] Add clearer DB connection errors in `lib/db/src/index.ts`
- [x] Restart API server and frontend; verify `/api/stats`, `/api/offres`, `/api/actualites` return 200
- [x] Create admin authentication system with /api/admin/login endpoint
- [x] Create admin routes (/admin, /admin/actualites/new, /admin/actualites/edit/:id)
- [x] Protect admin API endpoints with requireAdmin middleware
- [x] Create admin dashboard page with CRUD functionality

## Pre-production server hardening

- [ ] Confirm the exact Nginx version with `docker compose exec frontend nginx -v`
- [ ] Rebuild the frontend with a current supported `nginx:alpine` image
- [ ] Add `server_tokens off;` to hide the Nginx version
- [ ] Add security headers: CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and HSTS after HTTPS is trusted
- [ ] Replace the temporary self-signed certificate with a valid certificate for `bnm.mr`
- [ ] Point `bnm.mr` DNS to the server and forward public ports 80 and 443 to `192.168.1.200`
- [ ] Verify firewall rules allow only required public ports; do not expose PostgreSQL port 5432 publicly
- [ ] Remove or block `/test.php` and `/server-info`, then verify they return 404 or 403
- [ ] Find all external font, script, stylesheet, and icon dependencies in the built site
- [ ] Download required fonts and host them locally under the frontend assets
- [ ] Remove Google Fonts requests and add SRI to any unavoidable remaining external resources
- [ ] Test the complete site and API through HTTPS, including admin login and CRUD actions
- [ ] Run a new OWASP ZAP scan against the HTTPS production-like URL
- [ ] Review and close all High and Medium findings before public launch
- [ ] Document recurring patching, certificate renewal, backup, and security-scan procedures



