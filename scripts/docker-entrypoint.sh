#!/bin/sh
set -e

# when node_modules missing (e.g. after host-side cleanup), install dependencies automatically
if [ ! -d node_modules ]; then
    echo "[entrypoint] node_modules missing, running pnpm install..."
    pnpm install --frozen-lockfile || pnpm install
fi

exec "$@"
