import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { JwtPayload } from '../types/jwt-payload.type';

// Decorator para marcar endpoints que devem gerar audit log
export const AUDIT_ACTION_KEY = 'audit_action';
export const AuditAction = (action: string, entityType: string) =>
  Reflect.metadata(AUDIT_ACTION_KEY, { action, entityType });

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditLogInterceptor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const meta = this.reflector.get<{ action: string; entityType: string }>(
      AUDIT_ACTION_KEY,
      context.getHandler(),
    );

    // Se o endpoint não tem @AuditAction, não regista
    if (!meta) return next.handle();

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload | undefined;

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          if (!user) return;

          // Extrai o entityId da resposta ou dos params
          const entityId = responseBody?.id ?? request.params?.id ?? 'unknown';

          this.prisma.auditLog
            .create({
              data: {
                userId: user.sub,
                action: meta.action,
                entityType: meta.entityType,
                entityId,
                ipAddress: request.ip,
                metadata: {
                  method: request.method,
                  path: request.path,
                  body: this.sanitizeBody(request.body),
                },
              },
            })
            .catch((err) =>
              // Nunca deixar o audit log quebrar a operação principal
              this.logger.error('Erro ao gravar audit log', err),
            );
        },
      }),
    );
  }

  // Remove campos sensíveis antes de guardar no log
  private sanitizeBody(body: Record<string, any>): Record<string, any> {
    if (!body) return {};
    const sensitive = ['password', 'pin', 'passwordHash', 'pinHash', 'secret'];
    return Object.fromEntries(
      Object.entries(body).filter(([key]) => !sensitive.includes(key)),
    );
  }
}
