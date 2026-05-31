# ─────────────────────────────────────────────
# Stage 1 — deps
# Instala apenas dependências de produção
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma ./prisma/

RUN npm ci --omit=dev && \
    npx prisma generate

# ─────────────────────────────────────────────
# Stage 2 — builder
# Compila o TypeScript
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma ./prisma/

# Instala todas as deps (incluindo devDependencies para compilar)
RUN npm ci

COPY src ./src

RUN npx prisma generate && \
    npm run build

# ─────────────────────────────────────────────
# Stage 3 — runner (imagem final)
# Apenas o necessário para correr em produção
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner

# Instala dumb-init para gestão correcta de sinais no PID 1
RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Utilizador não-root — boa prática de segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nestjs

# Copia apenas o necessário do builder e deps
COPY --from=deps    --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist         ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma       ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# dumb-init garante que SIGTERM chega à aplicação Node e não fica preso
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]