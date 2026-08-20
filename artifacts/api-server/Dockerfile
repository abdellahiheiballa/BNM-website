FROM node:22-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY lib/ ./lib/
COPY artifacts/api-server/ ./artifacts/api-server/

RUN corepack enable && pnpm install --frozen-lockfile

RUN cd artifacts/api-server && node ./build.mjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
