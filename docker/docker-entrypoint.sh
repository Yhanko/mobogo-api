#!/bin/sh

set -e

echo "Applying migrations..."

npx prisma migrate deploy

echo "Starting application..."

exec node dist/main.js