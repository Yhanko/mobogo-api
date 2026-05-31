import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  /**
   * Identifica o cliente pelo IP real — suporta proxies (Nginx, load balancer).
   * Ordem de preferência:
   * 1. X-Forwarded-For  (proxy reverso / cloud)
   * 2. X-Real-IP        (Nginx)
   * 3. req.ip           (ligação directa)
   */
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      // X-Forwarded-For pode ser "ip1, ip2, ip3" — o primeiro é o cliente real
      return (forwarded as string).split(',')[0].trim();
    }
    return req.headers['x-real-ip'] ?? req.ip ?? 'unknown';
  }

  /**
   * Permite ignorar rate limit em rotas marcadas com @SkipThrottle().
   * O NestJS Throttler já suporta isto nativamente — apenas delegamos.
   */
  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    return super.shouldSkip(context);
  }
}
