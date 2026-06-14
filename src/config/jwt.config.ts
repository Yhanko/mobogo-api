import { registerAs } from '@nestjs/config';
import { env } from './env.config';

export default registerAs('jwt', () => ({
  secret: env.JWT_SECRET,
  accessExpires: env.JWT_ACCESS_EXPIRES,
  refreshExpires: env.JWT_REFRESH_EXPIRES,

  // Refresh token rotation — cada uso gera um novo refresh token
  // O token antigo é invalidado imediatamente no Redis
  rotation: env.JWT_ROTATION_ENABLED !== 'false',

  // Issuer e audience para validação extra
  issuer: env.JWT_ISSUER,
  audience: env.JWT_AUDIENCE,
}));
