FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY lib/ ./lib/
COPY artifacts/api-server/ ./artifacts/api-server/

RUN corepack enable && pnpm install --frozen-lockfile

RUN cd artifacts/api-server && pnpm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/artifacts/api-server/dist ./dist
COPY --from=builder /app/artifacts/api-server/node_modules ./node_modules
COPY --from=builder /app/lib ./lib

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
