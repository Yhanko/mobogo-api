#!/bin/sh
set -e

# Executa migrações do banco se AUTO_MIGRATE ou RUN_MIGRATIONS estiver ativado
if [ "$AUTO_MIGRATE" = "true" ] || [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "🚀 [Mobogo API] Aplicando migrações do banco de dados (Prisma)..."
  if [ -x "./node_modules/.bin/prisma" ]; then
    ./node_modules/.bin/prisma migrate deploy
  else
    npx prisma migrate deploy
  fi
  echo "✅ [Mobogo API] Migrações concluídas com sucesso."
fi

echo "🚕 [Mobogo API] Iniciando aplicação na porta ${PORT:-8000}..."
exec node dist/src/main.js