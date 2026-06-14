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
import { UseGuards, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocationService } from './location.service';
import { RedisService } from '@/infra/redis/redis.service';
import { EmitLocationDto } from '@/modules/location/dto/location.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// ── Rooms (salas Socket.io) ───────────────────────────────────────────────────
// Cada admin/lotador subscreve 'drivers:active' e recebe actualizações de todos
// O cliente subscreve 'driver:{id}' para seguir um taxista específico

const ROOM_ALL_DRIVERS = 'drivers:active';
const roomDriver = (id: string) => `driver:${id}`;

@WebSocketGateway({
  cors: { origin: '*' }, // em produção restringe ao domínio do app
  namespace: '/location',
  transports: ['websocket'], // força WebSocket puro — sem polling
})
export class LocationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
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

    // Subscreve o canal Redis Pub/Sub onde o LocationService publica
    // Quando um taxista envia posição via HTTP, o Redis publica aqui
    // e o Gateway reencaminha para todos os clientes WebSocket subscritos
    this.redis
      .subscribe('driver:location', (message) => {
        try {
          const data = JSON.parse(message);

          // Emite para a sala do taxista específico
          this.server
            .to(roomDriver(data.driverId))
            .emit('location:update', data);

          // Emite para a sala geral (admin, lotador)
          this.server.to(ROOM_ALL_DRIVERS).emit('location:update', data);
        } catch (err) {
          this.logger.error('Erro ao processar mensagem Pub/Sub', err);
        }
      })
      .catch((err) => this.logger.error('Erro ao subscrever canal Redis', err));
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
        issuer: this.config.get('JWT_ISSUER', 'taxi-api'),
        audience: this.config.get('JWT_AUDIENCE', 'taxi-clients'),
      });

      // Guarda o payload no socket para uso posterior
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

    // Se era taxista, remove do mapa
    if (user.role === 'DRIVER') {
      this.driverSockets.delete(user.sub);
      this.logger.log(`Taxista desconectado: ${user.sub}`);
    }

    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // ── Mensagens recebidas ───────────────────────────────────────────────────

  /**
   * Taxista emite a sua posição GPS em tempo real.
   * O cliente mobile chama isto a cada 3-5 segundos.
   */
  @SubscribeMessage('location:emit')
  async handleLocationEmit(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: EmitLocationDto,
  ) {
    const user = (client as any).user;

    if (!user || user.role !== 'DRIVER') {
      return { error: 'Apenas taxistas podem emitir localização' };
    }

    // Valida o DTO manualmente (WebSockets não têm ValidationPipe automático)
    const dto = plainToInstance(EmitLocationDto, data);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return { error: 'Dados de localização inválidos', details: errors };
    }

    // Regista o socket deste taxista
    this.driverSockets.set(user.sub, client.id);

    await this.locationService.updateDriverLocation(user.sub, dto);

    // ACK para o cliente — confirma recepção
    return { ok: true };
  }

  /**
   * Cliente/admin subscreve actualizações de um taxista específico.
   * Ex: cliente quer ver onde está o seu taxista.
   */
  @SubscribeMessage('location:watch:driver')
  async handleWatchDriver(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { driverId: string },
  ) {
    const user = (client as any).user;
    if (!user) return { error: 'Não autenticado' };

    await client.join(roomDriver(data.driverId));

    // Envia posição actual imediatamente (não espera próxima emissão)
    const current = await this.locationService.getDriverLocation(data.driverId);
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

    if (!user || !['ADMIN', 'LOTADOR'].includes(user.role)) {
      return { error: 'Permissão insuficiente' };
    }

    await client.join(ROOM_ALL_DRIVERS);

    // Envia snapshot actual de todos os activos
    const active = await this.locationService.getActiveDrivers();
    client.emit('location:snapshot', active);

    return { ok: true, watching: 'all', count: active.length };
  }

  /**
   * Para de seguir actualizações.
   */
  @SubscribeMessage('location:unwatch')
  async handleUnwatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { driverId?: string },
  ) {
    if (data.driverId) {
      await client.leave(roomDriver(data.driverId));
    } else {
      await client.leave(ROOM_ALL_DRIVERS);
    }
    return { ok: true };
  }
}
