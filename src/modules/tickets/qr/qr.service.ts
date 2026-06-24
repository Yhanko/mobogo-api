import {
  Injectable,
  BadRequestException,
  GoneException,
  ConflictException,
} from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@/infra/redis/redis.service';

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface QrPayload {
  tid: string; // ticket id
  sig: string; // assinatura HMAC
  exp: number; // unix ms de expiração
}

export interface ScanResult {
  ticketId: string;
  isValid: boolean;
}

// ─── Constantes ─────────────────────────────────────────────────────────────

const QR_TTL_MS = 60_000; // QR expira em 60 segundos
const USED_KEY_TTL_S = 300; // guarda no Redis 5 min para anti-replay
const SHORT_CODE_LEN = 6;
const MAX_PIN_TRIES = 3;
const PIN_WINDOW_S = 3600; // janela de rate limit: 1 hora

// ─── Service ────────────────────────────────────────────────────────────────

@Injectable()
export class QrService {
  private readonly hmacSecret: string;

  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {
    this.hmacSecret = config.getOrThrow<string>('QR_HMAC_SECRET');
  }

  // ── Geração ──────────────────────────────────────────────────────────────

  /**
   * Gera o conteúdo do QR a exibir no ecrã do passageiro.
   * Chamado em cada render — não persiste, expira em 60s.
   */
  generateQrContent(ticketId: string, ticketCreatedAt: Date): string {
    const exp = Date.now() + QR_TTL_MS;
    const sig = this.sign(ticketId, ticketCreatedAt.toISOString(), exp);
    const payload: QrPayload = { tid: ticketId, sig, exp };
    return Buffer.from(JSON.stringify(payload)).toString('base64url');
  }

  /**
   * Gera um short code numérico de 6 dígitos para passageiros sem QR.
   * Criptograficamente seguro: usa randomBytes, não Math.random().
   */
  generateShortCode(): string {
    const bytes = randomBytes(4);
    const num = bytes.readUInt32BE(0) % 1_000_000;
    return num.toString().padStart(SHORT_CODE_LEN, '0');
  }

  // ── Validação QR ─────────────────────────────────────────────────────────

  /**
   * Valida QR escaneado pelo taxista.
   * Lança excepções descritivas para cada tipo de falha.
   */
  async validateQrScan(
    rawQr: string,
    ticketCreatedAt: Date,
  ): Promise<ScanResult> {
    // 1. Decode
    let payload: QrPayload;
    try {
      payload = JSON.parse(
        Buffer.from(rawQr, 'base64url').toString('utf8'),
      ) as QrPayload;
    } catch {
      throw new BadRequestException('QR inválido');
    }

    // 2. Valida expiração (detecta screenshots antigos)
    if (Date.now() > payload.exp) {
      throw new GoneException(
        'QR expirado — peça ao passageiro para actualizar',
      );
    }

    // 3. Valida assinatura HMAC (detecta QR falsificados)
    const expectedSig = this.sign(
      payload.tid,
      ticketCreatedAt.toISOString(),
      payload.exp,
    );
    if (!this.timingSafeEqual(expectedSig, payload.sig)) {
      throw new BadRequestException('Assinatura QR inválida');
    }

    // 4. Anti-replay: verifica se já foi usado (Redis)
    const usedKey = `qr:used:${payload.tid}`;
    const alreadyUsed = await this.redis.get(usedKey);
    if (alreadyUsed) {
      throw new ConflictException('Ticket já utilizado');
    }

    // 5. Marca como usado no Redis (atómico, 5 min de janela)
    // SET NX garante que dois scans simultâneos não passam ambos
    const set = await this.redis.setNx(usedKey, '1', USED_KEY_TTL_S);
    if (!set) {
      throw new ConflictException(
        'Ticket já utilizado (race condition detectada)',
      );
    }

    return { ticketId: payload.tid, isValid: true };
  }

  // ── Validação Short Code ──────────────────────────────────────────────────

  /**
   * Valida short code com rate limiting por código.
   * Máximo 3 tentativas por hora para evitar brute force.
   */
  async validateShortCode(
    shortCode: string,
    ticketId: string,
  ): Promise<ScanResult> {
    const attemptsKey = `shortcode:attempts:${shortCode}`;

    // Incrementa contador de tentativas
    const attempts = await this.redis.incr(attemptsKey);
    if (attempts === 1) {
      // Primeira tentativa — define TTL da janela
      await this.redis.expire(attemptsKey, PIN_WINDOW_S);
    }

    if (attempts > MAX_PIN_TRIES) {
      const ttl = await this.redis.ttl(attemptsKey);
      throw new BadRequestException(
        `Limite de tentativas excedido. Tenta novamente em ${Math.ceil(ttl / 60)} minutos`,
      );
    }

    // Verifica anti-replay igual ao QR
    const usedKey = `shortcode:used:${ticketId}`;
    const alreadyUsed = await this.redis.get(usedKey);
    if (alreadyUsed) throw new ConflictException('Ticket já utilizado');

    const set = await this.redis.setNx(usedKey, '1', USED_KEY_TTL_S);
    if (!set) throw new ConflictException('Ticket já utilizado');

    // Limpa o contador em caso de sucesso
    await this.redis.del(attemptsKey);

    return { ticketId, isValid: true };
  }

  // ── Helpers privados ─────────────────────────────────────────────────────

  private sign(ticketId: string, createdAt: string, exp: number): string {
    return createHmac('sha256', this.hmacSecret)
      .update(`${ticketId}:${createdAt}:${exp}`)
      .digest('hex');
  }

  /**
   * Comparação em tempo constante — previne timing attacks na assinatura.
   */
  private timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    return require('crypto').timingSafeEqual(bufA, bufB);
  }

  // Método auxiliar — decode sem validar, para extrair o ticketId antes da validação completa
  decodeQrContent(rawQr: string): QrPayload {
    try {
      return JSON.parse(
        Buffer.from(rawQr, 'base64url').toString('utf8'),
      ) as QrPayload;
    } catch {
      throw new BadRequestException(
        'QR inválido — não foi possível decodificar',
      );
    }
  }
}
