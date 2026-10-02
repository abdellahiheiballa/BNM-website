FROM node:22-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY lib/ ./lib/
COPY artifacts/api-server/ ./artifacts/api-server/
# The lockfile records every workspace importer, so pnpm needs each
# package.json present even when only one artifact is built here.
COPY artifacts/bnm-site/package.json ./artifacts/bnm-site/package.json
COPY artifacts/mockup-sandbox/package.json ./artifacts/mockup-sandbox/package.json
COPY scripts/package.json ./scripts/package.json

RUN npm install -g corepack \
	&& corepack enable \
	&& pnpm install --frozen-lockfile

RUN cd artifacts/api-server && node ./build.mjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["sh", "./artifacts/api-server/entrypoint.sh"]
