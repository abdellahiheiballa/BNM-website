FROM node:22-bullseye AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY lib/ ./lib/
COPY artifacts/bnm-site/ ./artifacts/bnm-site/

RUN npm install -g corepack \
	&& corepack enable \
	&& pnpm install --frozen-lockfile

RUN cd artifacts/bnm-site && pnpm run build

FROM nginx:alpine
COPY --from=builder /app/artifacts/bnm-site/dist/public /usr/share/nginx/html
COPY artifacts/bnm-site/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
