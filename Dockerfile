# syntax=docker/dockerfile:1.6

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=development

# Ensure glibc compatibility for packages that rely on it
RUN apk add --no-cache libc6-compat

# Enable pnpm through corepack (ships with Node 20)
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

FROM base AS deps
# Copy manifest files and config needed during dependency installation
COPY package.json pnpm-lock.yaml* ./
COPY source.config.ts ./source.config.ts
COPY content ./content

# Install dependencies; fall back to non-frozen install when lockfile is missing
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]
