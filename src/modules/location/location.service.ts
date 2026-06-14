import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { EmitLocationDto } from '@/modules/location/dto/location.dto';

export interface DriverLocationSnapshot {
  driverId: string;
  driverName: string;
  plate: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number | null;
  updatedAt: string; // ISO string
  isOnline: boolean;
}

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  // ── Taxista emite a sua posição ───────────────────────────────────────────

  async updateDriverLocation(
    driverId: string,
    dto: EmitLocationDto,
  ): Promise<void> {
    const snapshot: DriverLocationSnapshot & {
      driverName: string;
      plate: string;
    } = {
      driverId,
      driverName: '', // preenchido abaixo se necessário
      plate: '',
      lat: dto.lat,
      lng: dto.lng,
      speed: dto.speed ?? 0,
      heading: dto.heading ?? null,
      updatedAt: new Date().toISOString(),
      isOnline: true,
    };

    // 1. Guarda posição actual no Redis (TTL curto — 30s)
    //    Se o taxista parar de emitir, desaparece do mapa automaticamente
    await this.redis.setJson(
      RedisService.keys.driverLocation(driverId),
      snapshot,
      30,
    );

    // 2. Marca taxista como online (TTL 35s — ligeiramente maior que a posição)
    await this.redis.set(RedisService.keys.driverOnline(driverId), '1', 35);

    // 3. Persiste no TimescaleDB para histórico (assíncrono, não bloqueia)
    this.prisma.locationEvent
      .create({
        data: {
          driverId,
          lat: dto.lat,
          lng: dto.lng,
          speed: dto.speed ?? 0,
          heading: dto.heading,
          recordedAt: new Date(),
        },
      })
      .catch((err) =>
        this.logger.error(
          `Erro ao persistir localização do driver ${driverId}`,
          err,
        ),
      );

    // 4. Publica no canal Redis Pub/Sub para o Gateway reencaminhar via WebSocket
    await this.redis.publish(
      'driver:location',
      JSON.stringify({
        driverId,
        lat: dto.lat,
        lng: dto.lng,
        speed: dto.speed ?? 0,
        heading: dto.heading,
      }),
    );
  }

  // ── Posição actual de um taxista específico ───────────────────────────────

  async getDriverLocation(
    driverId: string,
  ): Promise<DriverLocationSnapshot | null> {
    return this.redis.getJson<DriverLocationSnapshot>(
      RedisService.keys.driverLocation(driverId),
    );
  }

  // ── Todos os táxis activos (para mapa do admin/lotador) ───────────────────

  async getActiveDrivers(): Promise<DriverLocationSnapshot[]> {
    // Busca todos os taxistas activos na base de dados
    const drivers = await this.prisma.driver.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        licensePlate: true,
        user: { select: { name: true } },
      },
    });

    // Para cada um, tenta ler a posição do Redis em paralelo
    const results = await Promise.all(
      drivers.map(async (d) => {
        const loc = await this.redis.getJson<DriverLocationSnapshot>(
          RedisService.keys.driverLocation(d.id),
        );
        if (!loc) return null; // offline — sem posição no Redis

        return {
          ...loc,
          driverName: d.user.name,
          plate: d.licensePlate,
        };
      }),
    );

    // Filtra os que não têm posição (offline)
    return results.filter(Boolean) as DriverLocationSnapshot[];
  }

  // ── Histórico de posições de um taxista (para relatórios) ─────────────────

  async getDriverLocationHistory(
    driverId: string,
    from: Date,
    to: Date,
    limit = 500,
  ) {
    // Verifica que o taxista existe
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) throw new NotFoundException('Taxista não encontrado');

    return this.prisma.locationEvent.findMany({
      where: {
        driverId,
        recordedAt: { gte: from, lte: to },
      },
      orderBy: { recordedAt: 'desc' },
      take: limit,
      select: {
        lat: true,
        lng: true,
        speed: true,
        heading: true,
        recordedAt: true,
      },
    });
  }
}
