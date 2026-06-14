import { registerAs } from '@nestjs/config';
import { env } from './env.config';

export default registerAs('database', () => ({
  url: env.DATABASE_URL,

  // Pool de conexões — crítico para 5000+ táxis em produção
  pool: {
    min: parseInt(env.DB_POOL_MIN, 10),
    max: parseInt(env.DB_POOL_MAX, 10),
    acquireTimeout: parseInt(env.DB_POOL_ACQUIRE_TIMEOUT, 10),
    idleTimeout: parseInt(env.DB_POOL_IDLE_TIMEOUT, 10),
  },

  // Log de queries — apenas em desenvolvimento
  log:
    env.ENVIRONMENT === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
}));
