import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtPayload } from '@/common/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      issuer: config.get<string>('JWT_ISSUER', 'taxi-api'),
      audience: config.get<string>('JWT_AUDIENCE', 'taxi-clients'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // Delega ao AuthService que usa cache Redis (30s)
    // antes de ir à base de dados
    return this.authService.validatePayload(payload);
  }
}
