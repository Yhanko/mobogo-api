# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# Global Build Arguments
# ─────────────────────────────────────────────────────────────
ARG NODE_VERSION=20-alpine

# ─────────────────────────────────────────────────────────────
# Stage 1 — deps: Instala todas as dependências e gera Prisma Client
# ─────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS deps

WORKDIR /app

# Instala OpenSSL necessário para a engine do Prisma no Alpine
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma.config.ts* ./
COPY prisma ./prisma/

# Cache mount do npm para acelerar drasticamente builds subsequentes
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Gera o cliente Prisma com os targets configurados
RUN npx prisma generate

# ─────────────────────────────────────────────────────────────
# Stage 2 — builder: Compila o TypeScript com NestJS CLI / SWC
# ─────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# Reaproveita node_modules já preparados no estágio deps
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma.config.ts* ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma ./prisma/
COPY src ./src

# Compila o projeto (SWC compiler configurado no nest-cli.json)
RUN npx nest build

# Remove dependências de desenvolvimento, mantendo apenas produção (incluindo Prisma CLI para migrações)
RUN --mount=type=cache,target=/root/.npm \
    npm prune --omit=dev

# ─────────────────────────────────────────────────────────────
# Stage 3 — runner: Imagem final de execução em produção
# ─────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS runner

LABEL maintainer="Mobogo Team" \
      description="Mobogo API Backend Production Image"

# dumb-init para gerenciamento adequado de processos (PID 1 e sinais UNIX)
# openssl para a engine do Prisma
RUN apk update && \
    apk add --no-cache dumb-init openssl && \
    rm -rf /var/cache/apk/*

ENV NODE_ENV=production \
    PORT=8000 \
    NODE_OPTIONS="--max-old-space-size=1536"

WORKDIR /app

# Usuário e grupo não-root (princípio do menor privilégio)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nestjs

# Copia os artefatos compilados e dependências
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist         ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma       ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma.config.ts* ./
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

# Script de entrada para migrações opcionais e inicialização segura
COPY --chown=nestjs:nodejs docker/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

USER nestjs

EXPOSE 8000

# Health check contra a rota real da API (/api/v1/health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:8000/api/v1/health || exit 1

ENTRYPOINT ["dumb-init", "--", "./docker-entrypoint.sh"]