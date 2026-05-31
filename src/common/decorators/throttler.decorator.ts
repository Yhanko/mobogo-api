import { Throttle, SkipThrottle } from '@nestjs/throttler';

// ── Re-exporta os decorators do NestJS Throttler ──────────────────────────────
// Assim os módulos só importam daqui — não dependem directamente do @nestjs/throttler
export { SkipThrottle };

/**
 * Limites pré-definidos por tipo de endpoint.
 * Usa nos controllers com @ThrottleStrict(), @ThrottleLoose(), etc.
 *
 * Exemplo:
 *   @ThrottleStrict()           → 5 req / 60s  (login, OTP)
 *   @ThrottleDefault()          → 60 req / 60s (padrão)
 *   @ThrottleLoose()            → 300 req / 60s (leitura frequente, GPS)
 *   @SkipThrottle()             → sem limite    (health check, webhooks internos)
 *   @Throttle({ default: { limit: 10, ttl: 30000 } })  → personalizado
 */

// 5 req / minuto — login, refresh, change-password
export const ThrottleStrict = () =>
  Throttle({ default: { limit: 5, ttl: 60_000 } });

// 30 req / minuto — criação de recursos (tickets, utilizadores)
export const ThrottleMedium = () =>
  Throttle({ default: { limit: 30, ttl: 60_000 } });

// 60 req / minuto — operações normais (padrão global)
export const ThrottleDefault = () =>
  Throttle({ default: { limit: 60, ttl: 60_000 } });

// 300 req / minuto — leitura frequente (GPS, saldo em tempo real)
export const ThrottleLoose = () =>
  Throttle({ default: { limit: 300, ttl: 60_000 } });
