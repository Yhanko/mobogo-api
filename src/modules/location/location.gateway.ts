import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocationService } from './location.service';
import { RedisService } from '@/infra/redis/redis.service';
import { EmitLocationDto } from '@/modules/location/dto/location.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// ── Rooms (salas Socket.io) ───────────────────────────────────────────────────
const ROOM_ALL_DRIVERS = 'drivers:active';
const ROOM_ALL_PASSENGERS = 'passengers:active';
const roomDriver = (id: string) => `driver:${id}`;
const roomPassenger = (id: string) => `passenger:${id}`;

@WebSocketGateway({
  cors: { origin: '*' }, // em produção restringe ao domínio do app
  namespace: '/location',
  transports: ['websocket'], // força WebSocket puro — sem polling
})
export class LocationGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnApplicationBootstrap
{
  @WebSocketServer()
  private server: Server;

  private readonly logger = new Logger(LocationGateway.name);

  // Mapa driverId → socketId para saber qual socket pertence a que taxista
  private driverSockets = new Map<string, string>();

  constructor(
    private readonly locationService: LocationService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ── Ciclo de vida ─────────────────────────────────────────────────────────

  afterInit() {
    this.logger.log('LocationGateway inicializado');
  }

  onApplicationBootstrap() {
    // 1. Subscreve canal de localização de motoristas
    this.redis
      .subscribe('driver:location', (message) => {
        try {
          const data = JSON.parse(message);
          this.server
            .to(roomDriver(data.driverId))
            .emit('location:update', data);
          this.server.to(ROOM_ALL_DRIVERS).emit('location:update', data);
        } catch (err) {
          this.logger.error(
            'Erro ao processar mensagem Pub/Sub de motorista',
            err,
          );
        }
      })
      .catch((err) =>
        this.logger.error('Erro ao subscrever canal driver:location', err),
      );

    // 2. Subscreve canal de localização de passageiros
    this.redis
      .subscribe('passenger:location', (message) => {
        try {
          const data = JSON.parse(message);
          this.server
            .to(roomPassenger(data.passengerId))
            .emit('passenger:location:update', data);
          this.server
            .to(ROOM_ALL_PASSENGERS)
            .emit('passenger:location:update', data);
        } catch (err) {
          this.logger.error(
            'Erro ao processar mensagem Pub/Sub de passageiro',
            err,
          );
        }
      })
      .catch((err) =>
        this.logger.error('Erro ao subscrever canal passenger:location', err),
      );
  }

  async handleConnection(client: Socket) {
    try {
      // Autentica o WebSocket pelo token JWT no handshake
      const token =
        client.handshake.auth?.token ??
        client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        client.emit('error', { message: 'Token não fornecido' });
        client.disconnect();
        return;
      }

      const payload = this.jwt.verify(token, {
        secret: this.config.getOrThrow('JWT_SECRET'),
        issuer: this.config.get('JWT_ISSUER', 'mobogo-api'),
        audience: this.config.get('JWT_AUDIENCE', 'mobogo-clients'),
      });

      (client as any).user = payload;

      this.logger.log(
        `Cliente conectado: ${client.id} | role: ${payload.role} | user: ${payload.sub}`,
      );
    } catch {
      client.emit('error', { message: 'Token inválido' });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = (client as any).user;
    if (!user) return;

    if (user.role === 'DRIVER') {
      this.driverSockets.delete(user.sub);
      this.logger.log(`Taxista desconectado: ${user.sub}`);
    }

    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // ── Mensagens recebidas ───────────────────────────────────────────────────

  /**
   * Emissão de localização em tempo real (Motorista ou Passageiro).
   */
  @SubscribeMessage('location:emit')
  async handleLocationEmit(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: EmitLocationDto,
  ) {
    const user = (client as any).user;

    if (!user || !['DRIVER', 'PASSENGER'].includes(user.role)) {
      return {
        error: 'Apenas motoristas e passageiros podem emitir localização',
      };
    }

    const dto = plainToInstance(EmitLocationDto, data);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return { error: 'Dados de localização inválidos', details: errors };
    }

    if (user.role === 'DRIVER') {
      this.driverSockets.set(user.sub, client.id);
      await this.locationService.updateDriverLocation(user.sub, dto);
    } else if (user.role === 'PASSENGER') {
      await this.locationService.updatePassengerLocation(user.sub, dto);
    }

    return { ok: true };
  }

  /**
   * Subscreve actualizações de um taxista específico.
   */
  @SubscribeMessage('location:watch:driver')
  async handleWatchDriver(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { driverId: string },
  ) {
    const user = (client as any).user;
    if (!user) return { error: 'Não autenticado' };

    await client.join(roomDriver(data.driverId));

    const current = await this.locationService.getDriverLocation(
      data.driverId,
    );
    if (current) {
      client.emit('location:update', current);
    }

    return { ok: true, watching: data.driverId };
  }

  /**
   * Admin/lotador subscreve todos os táxis activos.
   */
  @SubscribeMessage('location:watch:all')
  async handleWatchAll(@ConnectedSocket() client: Socket) {
    const user = (client as any).user;

    if (!user || !['ADMIN', 'LOTADOR', 'AGENT'].includes(user.role)) {
      return { error: 'Permissão insuficiente' };
    }

    await client.join(ROOM_ALL_DRIVERS);

    const active = await this.locationService.getActiveDrivers();
    client.emit('location:snapshot', active);

    return { ok: true, watching: 'all', count: active.length };
  }

  /**
   * Admin/lotador subscreve todos os passageiros activos.
   */
  @SubscribeMessage('location:watch:passengers')
  async handleWatchPassengers(@ConnectedSocket() client: Socket) {
    const user = (client as any).user;

    if (!user || !['ADMIN', 'LOTADOR', 'AGENT'].includes(user.role)) {
      return { error: 'Permissão insuficiente' };
    }

    await client.join(ROOM_ALL_PASSENGERS);

    const active = await this.locationService.getActivePassengers();
    client.emit('passengers:snapshot', active);

    return { ok: true, watching: 'passengers', count: active.length };
  }

  /**
   * Para de seguir actualizações.
   */
  @SubscribeMessage('location:unwatch')
  async handleUnwatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { driverId?: string; passengerId?: string },
  ) {
    if (data.driverId) {
      await client.leave(roomDriver(data.driverId));
    } else if (data.passengerId) {
      await client.leave(roomPassenger(data.passengerId));
    } else {
      await client.leave(ROOM_ALL_DRIVERS);
      await client.leave(ROOM_ALL_PASSENGERS);
    }
    return { ok: true };
  }
}
