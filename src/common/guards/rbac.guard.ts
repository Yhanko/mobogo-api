import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/require-permission.decorator';
import { Permission } from '../types/permission.enum';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload | undefined;

    if (!user) throw new UnauthorizedException('Token não encontrado');

    const hasAll = required.every((p) => user.permissions.includes(p));

    if (!hasAll) {
      const missing = required.filter((p) => !user.permissions.includes(p));
      throw new ForbiddenException({
        message: 'Permissão insuficiente',
        missing,
      });
    }

    return true;
  }
}
