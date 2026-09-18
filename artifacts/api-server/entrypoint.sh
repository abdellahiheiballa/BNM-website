#!/bin/sh
set -e

cd /app/lib/db
pnpm push

cd /app
exec node --enable-source-maps ./artifacts/api-server/dist/index.mjs