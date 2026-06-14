import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { RedisService } from '@/infra/redis/redis.service';
import { generateLotadorReference } from '@/common/utils/crypto.util';
import { AddPartnerDto } from '@/modules/lotador/dto/addpatner.dto';
import {
  ConfirmBoardingDto,
  BoardingMethod,
} from '@/modules/lotador/dto/confirmboarding.dto';

@Injectable()
export class LotadorService {
  private readonly logger = new Logger(LotadorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  // ── Listar táxis disponíveis (com posição activa no Redis) ────────────────

  async getAvailableDrivers(lotadorUserId: string) {
    // Busca apenas parceiros do lotador
    const partnerships = await this.prisma.lotadorPartner.findMany({
      where: { lotadorUserId, isActive: true },
      include: {
        driver: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    // Para cada parceiro, verifica se está online no Redis
    const drivers = await Promise.all(
      partnerships.map(async (p) => {
        const isOnline = await this.redis.exists(
          RedisService.keys.driverOnline(p.driver.id),
        );

        const location = isOnline
          ? await this.redis.getJson<{
              lat: number;
              lng: number;
              speed: number;
            }>(RedisService.keys.driverLocation(p.driver.id))
          : null;

        return {
          driverId: p.driver.id,
          driverName: p.driver.user.name,
          licensePlate: p.driver.licensePlate,
          referenceCode: p.referenceCode,
          status: p.driver.status,
          isOnline,
          location: location
            ? { lat: location.lat, lng: location.lng, speed: location.speed }
            : null,
        };
      }),
    );

    return {
      total: drivers.length,
      online: drivers.filter((d) => d.isOnline).length,
      drivers,
    };
  }

  // ── Ver todos os táxis activos (não apenas parceiros) ─────────────────────

  async getAllActiveDrivers() {
    const activeDrivers = await this.prisma.driver.findMany({
      where: { status: 'ACTIVE' },
      include: { user: { select: { name: true } } },
    });

    const result = await Promise.all(
      activeDrivers.map(async (d) => {
        const isOnline = await this.redis.exists(
          RedisService.keys.driverOnline(d.id),
        );

        const location = isOnline
          ? await this.redis.getJson<{ lat: number; lng: number }>(
              RedisService.keys.driverLocation(d.id),
            )
          : null;

        return {
          driverId: d.id,
          driverName: d.user.name,
          licensePlate: d.licensePlate,
          isOnline,
          location,
        };
      }),
    );

    return result.filter((d) => d.isOnline);
  }

  // ── Confirmar embarque de passageiro ──────────────────────────────────────

  async confirmBoarding(lotadorUserId: string, dto: ConfirmBoardingDto) {
    // Anti-replay — previne confirmações duplicadas em 30s
    const lockKey = `lotador:boarding:${dto.value}`;
    const locked = await this.redis.setNx(lockKey, '1', 30);
    if (!locked) {
      throw new ConflictException('Embarque já foi confirmado recentemente');
    }

    try {
      let ticket: any = null;

      switch (dto.method) {
        case BoardingMethod.QR:
        case BoardingMethod.SHORT_CODE: {
          // Localiza o ticket pelo short code ou pelo valor do QR
          ticket = await this.prisma.ticket.findFirst({
            where:
              dto.method === BoardingMethod.SHORT_CODE
                ? { shortCode: dto.value, status: 'PENDING' }
                : { qrNonce: dto.value, status: 'PENDING' },
            include: {
              passenger: {
                select: { id: true, name: true, phone: true, displayId: true },
              },
              driver: {
                select: {
                  id: true,
                  licensePlate: true,
                  user: { select: { name: true } },
                },
              },
            },
          });
          break;
        }

        case BoardingMethod.REFERENCE: {
          // Confirma pelo código de referência da parceria LOT-XXXX-XXXX
          const partnership = await this.prisma.lotadorPartner.findUnique({
            where: { referenceCode: dto.value },
            include: {
              driver: {
                include: {
                  user: { select: { name: true } },
                  ticketsReceived: {
                    where: { status: 'PENDING' },
                    take: 1,
                    orderBy: { createdAt: 'desc' },
                    include: {
                      passenger: {
                        select: {
                          id: true,
                          name: true,
                          phone: true,
                          displayId: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (!partnership) {
            throw new NotFoundException(
              'Referência de parceria não encontrada',
            );
          }

          // Devolve info do taxista e do último ticket pendente
          return {
            method: BoardingMethod.REFERENCE,
            confirmed: true,
            driver: {
              id: partnership.driver.id,
              name: partnership.driver.user.name,
              licensePlate: partnership.driver.licensePlate,
            },
            lastPendingTicket: partnership.driver.ticketsReceived[0] ?? null,
            notes: dto.notes,
          };
        }

        default:
          throw new BadRequestException('Método de embarque inválido');
      }

      if (!ticket) {
        throw new NotFoundException('Ticket não encontrado ou já utilizado');
      }

      // Verifica que o taxista é parceiro do lotador
      const isPartner = await this.prisma.lotadorPartner.findFirst({
        where: {
          lotadorUserId,
          driverId: ticket.driver.id,
          isActive: true,
        },
      });

      if (!isPartner) {
        throw new ForbiddenException('Este taxista não é parceiro seu');
      }

      this.logger.log(
        `Embarque confirmado: lotador=${lotadorUserId} ticket=${ticket.id} ` +
          `driver=${ticket.driver.id} passenger=${ticket.passenger.id}`,
      );

      return {
        method: dto.method,
        confirmed: true,
        ticket: {
          id: ticket.id,
          amount: Number(ticket.amount),
          status: ticket.status,
        },
        passenger: ticket.passenger,
        driver: {
          id: ticket.driver.id,
          name: ticket.driver.user.name,
          licensePlate: ticket.driver.licensePlate,
        },
        notes: dto.notes,
      };
    } finally {
      // Liberta o lock após 5 segundos — janela para confirmação duplicada
      // (não apaga imediatamente para prevenir double-tap)
    }
  }

  // ── Ver referência do taxista ─────────────────────────────────────────────

  async getDriverReference(driverId: string, lotadorUserId: string) {
    const partnership = await this.prisma.lotadorPartner.findFirst({
      where: { driverId, lotadorUserId, isActive: true },
      include: {
        driver: {
          include: { user: { select: { name: true } } },
        },
      },
    });

    if (!partnership) {
      throw new NotFoundException(
        'Parceria não encontrada. Este taxista não é seu parceiro',
      );
    }

    const isOnline = await this.redis.exists(
      RedisService.keys.driverOnline(driverId),
    );

    return {
      referenceCode: partnership.referenceCode,
      driverName: partnership.driver.user.name,
      licensePlate: partnership.driver.licensePlate,
      isOnline,
      since: partnership.createdAt,
    };
  }

  // ── Adicionar parceiro ────────────────────────────────────────────────────

  async addPartner(lotadorUserId: string, dto: AddPartnerDto) {
    // Verifica que o taxista existe
    const driver = await this.prisma.driver.findUnique({
      where: { id: dto.driverId },
      include: { user: { select: { name: true } } },
    });
    if (!driver) throw new NotFoundException('Taxista não encontrado');

    // Verifica se a parceria já existe
    const existing = await this.prisma.lotadorPartner.findUnique({
      where: {
        driverId_lotadorUserId: {
          driverId: dto.driverId,
          lotadorUserId,
        },
      },
    });

    if (existing) {
      if (existing.isActive) {
        throw new ConflictException('Este taxista já é seu parceiro');
      }

      // Reactiva parceria inactiva com novo código de referência
      const updated = await this.prisma.lotadorPartner.update({
        where: { id: existing.id },
        data: {
          isActive: true,
          referenceCode: generateLotadorReference(),
        },
      });

      return {
        message: 'Parceria reactivada',
        referenceCode: updated.referenceCode,
        driverName: driver.user.name,
        licensePlate: driver.licensePlate,
      };
    }

    // Cria nova parceria com código de referência único
    const partnership = await this.prisma.lotadorPartner.create({
      data: {
        driverId: dto.driverId,
        lotadorUserId,
        referenceCode: generateLotadorReference(),
      },
    });

    this.logger.log(
      `Nova parceria: lotador=${lotadorUserId} driver=${dto.driverId} ref=${partnership.referenceCode}`,
    );

    return {
      message: 'Parceiro adicionado com sucesso',
      referenceCode: partnership.referenceCode,
      driverName: driver.user.name,
      licensePlate: driver.licensePlate,
    };
  }

  // ── Remover parceiro ──────────────────────────────────────────────────────

  async removePartner(lotadorUserId: string, driverId: string) {
    const partnership = await this.prisma.lotadorPartner.findFirst({
      where: { driverId, lotadorUserId, isActive: true },
    });

    if (!partnership) {
      throw new NotFoundException('Parceria não encontrada ou já inactiva');
    }

    await this.prisma.lotadorPartner.update({
      where: { id: partnership.id },
      data: { isActive: false },
    });

    return { message: 'Parceiro removido com sucesso' };
  }

  // ── Listar todos os parceiros ─────────────────────────────────────────────

  async listPartners(lotadorUserId: string) {
    const partnerships = await this.prisma.lotadorPartner.findMany({
      where: { lotadorUserId },
      include: {
        driver: {
          include: { user: { select: { name: true, phone: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return partnerships.map((p) => ({
      partnershipId: p.id,
      referenceCode: p.referenceCode,
      isActive: p.isActive,
      since: p.createdAt,
      driver: {
        id: p.driver.id,
        name: p.driver.user.name,
        phone: p.driver.user.phone,
        licensePlate: p.driver.licensePlate,
        status: p.driver.status,
      },
    }));
  }
}
