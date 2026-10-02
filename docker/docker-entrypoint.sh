#!/bin/sh
set -e

# 1. Carrega variáveis de ambiente de arquivo .env caso exista ou seja montado no container
if [ -f "/app/.env" ]; then
  echo "📄 [Mobogo API] Carregando variáveis de ambiente de /app/.env..."
  set -a
  . /app/.env
  set +a
elif [ -f ".env" ]; then
  echo "📄 [Mobogo API] Carregando variáveis de ambiente de .env..."
  set -a
  . ./.env
  set +a
fi

# 2. Executa migrações do banco se AUTO_MIGRATE ou RUN_MIGRATIONS estiver ativado
if [ "$AUTO_MIGRATE" = "true" ] || [ "$RUN_MIGRATIONS" = "true" ]; then
  if [ -z "$DATABASE_URL" ]; then
    echo "⚠️ [Mobogo API] AVISO: AUTO_MIGRATE está ativo, mas a variável DATABASE_URL não foi definida!"
  else
    echo "🚀 [Mobogo API] Aplicando migrações do Prisma com DATABASE_URL configurada..."
    if [ -x "./node_modules/.bin/prisma" ]; then
      ./node_modules/.bin/prisma migrate deploy
    else
      npx prisma migrate deploy
    fi
    echo "✅ [Mobogo API] Migrações concluídas com sucesso."
  fi
fi

echo "🚕 [Mobogo API] Iniciando aplicação na porta ${PORT:-8000} (Ambiente: ${NODE_ENV:-production})..."
exec node dist/src/main.js