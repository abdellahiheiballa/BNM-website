FROM node:22-slim AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY lib/ ./lib/
COPY artifacts/bnm-site/ ./artifacts/bnm-site/
# The lockfile records every workspace importer, so pnpm needs each
# package.json present even when only one artifact is built here.
COPY artifacts/api-server/package.json ./artifacts/api-server/package.json
COPY artifacts/mockup-sandbox/package.json ./artifacts/mockup-sandbox/package.json
COPY scripts/package.json ./scripts/package.json

RUN npm install -g corepack \
	&& corepack enable \
	&& pnpm install --frozen-lockfile

RUN cd artifacts/bnm-site && pnpm run build

FROM nginx:stable-alpine
COPY --from=builder /app/artifacts/bnm-site/dist/public /usr/share/nginx/html
COPY artifacts/bnm-site/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
