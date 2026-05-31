import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Wrapper do AuthGuard('jwt') do Passport.
 * Usa @UseGuards(JwtAuthGuard, RbacGuard) nos controllers
 * em vez de @UseGuards(AuthGuard('jwt'), RbacGuard).
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
