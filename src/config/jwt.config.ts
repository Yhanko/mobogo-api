import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret:         .env.JWT_SECRET,
  accessExpires:  process.env.JWT_ACCESS_EXPIRES  ?? '15m',
  refreshExpires: process.env.JWT_REFRESH_EXPIRES ?? '7d',

  // Refresh token rotation — cada uso gera um novo refresh token
  // O token antigo é invalidado imediatamente no Redis
  rotation: process.env.JWT_ROTATION_ENABLED !== 'false',

  // Issuer e audience para validação extra
  issuer:   process.env.JWT_ISSUER   ?? 'taxi-api',
  audience: process.env.JWT_AUDIENCE ?? 'taxi-clients',
}));