import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { EmitLocationDto } from '@/modules/location/dto/location.dto';

export interface DriverLocationSnapshot {
  driverId: string;
  driverName: string;
  plate: string;
  phone?: string | null;
  lat: number;
  lng: number;
  speed: number;
  heading: number | null;
  updatedAt: string; // ISO string
  lastUpdatedAt?: string;
  status?: string;
  isOnline: boolean;
  driver?: {
    licensePlate: string;
    user: {
      name: string;
      phone: string | null;
    };
  };
}

export interface PassengerLocationSnapshot {
  passengerId: string;
  passengerName: string;
  phone: string | null;
  displayId: string | null;
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
    const snapshot: DriverLocationSnapshot = {
      driverId,
      driverName: '', // preenchido na leitura se necessário
      plate: '',
      lat: dto.lat,
      lng: dto.lng,
      speed: dto.speed ?? 0,
      heading: dto.heading ?? null,
      updatedAt: new Date().toISOString(),
      isOnline: true,
    };

    // 1. Guarda posição actual no Redis (TTL curto — 30s)
    await this.redis.setJson(
      RedisService.keys.driverLocation(driverId),
      snapshot,
      30,
    );

    // 2. Marca taxista como online (TTL 35s)
    await this.redis.set(RedisService.keys.driverOnline(driverId), '1', 35);

    // 3. Persiste no PostgreSQL/TimescaleDB para histórico e auditoria
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

  // ── Passageiro emite a sua posição ────────────────────────────────────────

  async updatePassengerLocation(
    passengerId: string,
    dto: EmitLocationDto,
  ): Promise<void> {
    const snapshot: PassengerLocationSnapshot = {
      passengerId,
      passengerName: '',
      phone: null,
      displayId: null,
      lat: dto.lat,
      lng: dto.lng,
      speed: dto.speed ?? 0,
      heading: dto.heading ?? null,
      updatedAt: new Date().toISOString(),
      isOnline: true,
    };

    // 1. Guarda posição actual no Redis (TTL curto — 30s)
    await this.redis.setJson(
      RedisService.keys.passengerLocation(passengerId),
      snapshot,
      30,
    );

    // 2. Marca passageiro como online (TTL 35s)
    await this.redis.set(
      RedisService.keys.passengerOnline(passengerId),
      '1',
      35,
    );

    // 3. Persiste para auditoria e histórico
    this.prisma.locationEvent
      .create({
        data: {
          userId: passengerId,
          lat: dto.lat,
          lng: dto.lng,
          speed: dto.speed ?? 0,
          heading: dto.heading,
          recordedAt: new Date(),
        },
      })
      .catch((err) =>
        this.logger.error(
          `Erro ao persistir localização do passageiro ${passengerId}`,
          err,
        ),
      );

    // 4. Publica no canal Redis Pub/Sub
    await this.redis.publish(
      'passenger:location',
      JSON.stringify({
        passengerId,
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

  // ── Posição actual de um passageiro específico ────────────────────────────

  async getPassengerLocation(
    passengerId: string,
  ): Promise<PassengerLocationSnapshot | null> {
    return this.redis.getJson<PassengerLocationSnapshot>(
      RedisService.keys.passengerLocation(passengerId),
    );
  }

  // ── Todos os táxis activos (para mapa do admin/lotador) ───────────────────

  async getActiveDrivers(): Promise<DriverLocationSnapshot[]> {
    const drivers = await this.prisma.driver.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        licensePlate: true,
        user: { select: { name: true, phone: true } },
      },
    });

    const results = await Promise.all(
      drivers.map(async (d) => {
        const loc = await this.redis.getJson<DriverLocationSnapshot>(
          RedisService.keys.driverLocation(d.id),
        );
        if (!loc) return null;

        return {
          ...loc,
          driverName: d.user.name,
          plate: d.licensePlate,
          phone: d.user.phone,
          status: loc.status || 'ONLINE',
          lastUpdatedAt: loc.updatedAt,
          driver: {
            licensePlate: d.licensePlate,
            user: {
              name: d.user.name,
              phone: d.user.phone,
            },
          },
        };
      }),
    );

    return results.filter(Boolean) as DriverLocationSnapshot[];
  }

  // ── Todos os passageiros activos (para monitorização em tempo real) ─────────

  async getActivePassengers(): Promise<PassengerLocationSnapshot[]> {
    const passengers = await this.prisma.user.findMany({
      where: { role: 'PASSENGER', isActive: true },
      select: {
        id: true,
        name: true,
        phone: true,
        displayId: true,
      },
    });

    const results = await Promise.all(
      passengers.map(async (p) => {
        const loc = await this.redis.getJson<PassengerLocationSnapshot>(
          RedisService.keys.passengerLocation(p.id),
        );
        if (!loc) return null;

        return {
          ...loc,
          passengerName: p.name,
          phone: p.phone,
          displayId: p.displayId,
        };
      }),
    );

    return results.filter(Boolean) as PassengerLocationSnapshot[];
  }

  // ── Histórico de posições de um taxista ───────────────────────────────────

  async getDriverLocationHistory(
    driverId: string,
    from: Date,
    to: Date,
    limit = 500,
  ) {
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

  // ── Histórico de posições de qualquer utilizador (passageiro/motorista) ───

  async getUserLocationHistory(
    userId: string,
    from: Date,
    to: Date,
    limit = 500,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Utilizador não encontrado');

    return this.prisma.locationEvent.findMany({
      where: {
        OR: [{ userId }, { driver: { userId } }],
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
