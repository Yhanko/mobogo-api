import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let details: any = undefined;

    // ── HttpException (NestJS) ────────────────────────────────────────────
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      message =
        typeof body === 'string' ? body : ((body as any).message ?? message);
      details = typeof body === 'object' ? (body as any).missing : undefined;
    }

    // ── Prisma — erros de base de dados ───────────────────────────────────
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': // unique constraint
          status = HttpStatus.CONFLICT;
          message = `Já existe um registo com este ${(exception.meta?.target as string[])?.join(', ')}`;
          break;
        case 'P2025': // registo não encontrado
          status = HttpStatus.NOT_FOUND;
          message = 'Registo não encontrado';
          break;
        case 'P2003': // foreign key constraint
          status = HttpStatus.BAD_REQUEST;
          message = 'Referência inválida — o registo relacionado não existe';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = 'Erro na operação de base de dados';
      }
    }

    // ── Erros genéricos — não expõe detalhes em produção ─────────────────
    else if (exception instanceof Error) {
      this.logger.error(
        `Erro não tratado: ${exception.message}`,
        exception.stack,
        `${request.method} ${request.url}`,
      );
      // Em desenvolvimento, mostra a mensagem real
      if (process.env.NODE_ENV !== 'production') {
        message = exception.message;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      ...(details ? { details } : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
