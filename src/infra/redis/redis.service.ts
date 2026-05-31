import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

type RedisClient = RedisClientType<any, any, any>;

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  // Dois clientes separados — obrigatório para Pub/Sub
  // Um cliente em modo subscribe não pode fazer get/set
  private client!: RedisClient; // operações normais + publish
  private subscriber!: RedisClient; // apenas subscribe

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const url = this.config.getOrThrow<string>('REDIS_URL');

    this.client = createClient({ url }) as RedisClient;
    this.subscriber = this.client.duplicate() as RedisClient;

    this.client.on('error', (err) =>
      this.logger.error('Redis client error', err),
    );
    this.subscriber.on('error', (err) =>
      this.logger.error('Redis subscriber error', err),
    );

    await Promise.all([this.client.connect(), this.subscriber.connect()]);

    this.logger.log('Redis conectado (client + subscriber)');
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all([this.client.quit(), this.subscriber.quit()]);
  }

  // ── Operações básicas ─────────────────────────────────────────────────────

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    ttlSeconds
      ? await this.client.set(key, value, { EX: ttlSeconds })
      : await this.client.set(key, value);
  }

  /**
   * SET NX — só define se a chave não existir.
   * Retorna true se definiu, false se já existia.
   * Usado para anti-replay de QR codes e tickets.
   */
  async setNx(
    key: string,
    value: string,
    ttlSeconds: number,
  ): Promise<boolean> {
    const result = await this.client.set(key, value, {
      NX: true,
      EX: ttlSeconds,
    });
    return result === 'OK';
  }

  async del(...keys: string[]): Promise<void> {
    await this.client.del(keys);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.client.expire(key, ttlSeconds);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  // ── Hash (para cache de permissões de utilizadores) ───────────────────────

  async hSet(key: string, field: string, value: string): Promise<void> {
    await this.client.hSet(key, field, value);
  }

  async hGet(key: string, field: string): Promise<string | undefined> {
    return this.client.hGet(key, field);
  }

  async hGetAll(key: string): Promise<Record<string, string>> {
    return this.client.hGetAll(key);
  }

  // ── JSON helpers (serialização automática) ────────────────────────────────

  async setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  // ── Pub/Sub ───────────────────────────────────────────────────────────────

  /**
   * Publica mensagem num canal.
   * Usado pelo taxista ao emitir posição GPS.
   */
  async publish(channel: string, message: string): Promise<void> {
    await this.client.publish(channel, message);
  }

  /**
   * Subscreve um canal e chama o handler a cada mensagem.
   * Usado pelo LocationGateway para reencaminhar GPS via WebSocket.
   */
  async subscribe(
    channel: string,
    handler: (message: string) => void,
  ): Promise<void> {
    await this.subscriber.subscribe(channel, handler);
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }

  // ── Padrão de chaves ──────────────────────────────────────────────────────
  // Centraliza a nomenclatura para evitar colisões e facilitar debug

  static keys = {
    userPerms: (userId: string) => `user:perms:${userId}`,
    refreshToken: (userId: string) => `auth:refresh:${userId}`,
    qrUsed: (ticketId: string) => `qr:used:${ticketId}`,
    shortCodeUsed: (ticketId: string) => `shortcode:used:${ticketId}`,
    shortCodeTries: (code: string) => `shortcode:attempts:${code}`,
    driverLocation: (driverId: string) => `driver:loc:${driverId}`,
    driverOnline: (driverId: string) => `driver:online:${driverId}`,
  } as const;
}
