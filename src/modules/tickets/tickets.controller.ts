import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Permission } from '@/common/types/permission.enum';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { ThrottleMedium } from '@/common/decorators/throttler.decorator';
import { TicketsService } from '@/modules/tickets/tickets.service';
import { CreateTicketDto } from '@/modules/tickets/dto/create-ticket.dto';
import { ScanTicketDto } from '@/modules/tickets/dto/scan.dto';
import { CancelTicketDto } from '@/modules/tickets/dto/cancel-ticket.dto';
import { TransferTicketDto } from './dto/transfer.dto';

@ApiTags('tickets')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  /**
   * GET /tickets
   * Admin lista todos os tickets do sistema.
   */
  @Get()
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ApiOperation({ summary: 'Listar todos os tickets (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista paginada de tickets' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.ticketsService.findAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }


  /**
   * POST /tickets
   * Admin ou agente emite ticket para um passageiro.
   */
  @Post()
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_CREATE)
  @ApiOperation({ summary: 'Criar / emitir novo bilhete (Admin ou Agente)' })
  @ApiResponse({ status: 201, description: 'Bilhete criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados de bilhete inválidos' })
  create(@Body() dto: CreateTicketDto, @CurrentUser() user: JwtPayload) {
    return this.ticketsService.create(dto, user);
  }

  /**
   * GET /tickets/:id/qr
   * Passageiro obtém o conteúdo QR e short code do seu ticket.
   * Renovado a cada 60 segundos pelo app.
   */
  @Get(':id/qr')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ApiOperation({ summary: 'Obter conteúdo QR e short code do bilhete' })
  @ApiResponse({ status: 200, description: 'Dados do QR code obtidos com sucesso' })
  @ApiResponse({ status: 404, description: 'Bilhete não encontrado' })
  getQr(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ticketsService.getQrContent(id, user.sub);
  }

  /**
   * POST /tickets/scan
   * Taxista valida um ticket por QR ou short code.
   */
  @Post('scan')
  @ThrottleMedium()
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.TICKET_SCAN)
  @ApiOperation({ summary: 'Validar (scan) bilhete por QR ou código curto' })
  @ApiResponse({ status: 200, description: 'Bilhete validado e corrida iniciada' })
  @ApiResponse({ status: 400, description: 'Bilhete já utilizado, inválido ou expirado' })
  scan(@Body() dto: ScanTicketDto, @CurrentUser() user: JwtPayload) {
    return this.ticketsService.scan(dto, user.sub);
  }

  /**
   * PATCH /tickets/:id/cancel
   * Taxista ou admin cancela um ticket com motivo obrigatório.
   */
  @Patch(':id/cancel')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_CANCEL)
  @ApiOperation({ summary: 'Cancelar bilhete com motivo' })
  @ApiResponse({ status: 200, description: 'Bilhete cancelado com sucesso' })
  @ApiResponse({ status: 400, description: 'Bilhete não pode ser cancelado no estado atual' })
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CancelTicketDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ticketsService.cancel(id, dto, user);
  }

  /**
   * POST /tickets/admin/:id/simulate-scan
   * Simula a validação (scan) de um ticket pelo Admin.
   */
  @Post('admin/:id/simulate-scan')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_SCAN)
  @ApiOperation({ summary: 'Simular validação de bilhete (Apenas Admin)' })
  @ApiResponse({ status: 200, description: 'Validação simulada com sucesso' })
  simulateScan(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketsService.adminSimulateScan(id);
  }

  /**
   * PATCH /tickets/:id/transfer
   * Passageiro transfere ticket para outro passageiro.
   */
  @Patch(':id/transfer')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_TRANSFER)
  @ApiOperation({ summary: 'Transferir bilhete para outro passageiro' })
  @ApiResponse({ status: 200, description: 'Bilhete transferido com sucesso' })
  @ApiResponse({ status: 400, description: 'Destinatário inválido ou bilhete intransferível' })
  transfer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TransferTicketDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ticketsService.transfer(id, dto, user.sub);
  }

  /**
   * GET /tickets/my
   * Passageiro vê o seu próprio histórico de tickets.
   */
  @Get('my')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ApiOperation({ summary: 'Histórico de bilhetes do passageiro autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de bilhetes do utilizador logado' })
  myTickets(
    @CurrentUser() user: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ticketsService.findByPassenger(user.sub, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * GET /tickets/driver/today
   * Taxista vê os tickets do dia actual.
   */
  @Get('driver/today')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ApiOperation({ summary: 'Bilhetes do dia para o motorista logado' })
  @ApiResponse({ status: 200, description: 'Lista de bilhetes de hoje' })
  driverToday(
    @CurrentUser() user: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ticketsService.findByDriver(
      user.sub,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      'day',
    );
  }

  /**
   * GET /tickets/driver/month
   * Taxista vê os tickets do mês actual.
   */
  @Get('driver/month')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ApiOperation({ summary: 'Bilhetes do mês para o motorista logado' })
  @ApiResponse({ status: 200, description: 'Lista de bilhetes do mês' })
  driverMonth(
    @CurrentUser() user: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ticketsService.findByDriver(
      user.sub,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      'month',
    );
  }

  /**
   * GET /tickets/driver/:driverId
   * Admin ou cliente vê histórico de um taxista específico.
   */
  @Get('driver/:driverId')
  @ThrottleMedium()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ApiOperation({ summary: 'Histórico de bilhetes de um motorista específico' })
  @ApiResponse({ status: 200, description: 'Histórico de bilhetes do motorista' })
  driverHistory(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('period') period?: 'day' | 'month',
  ) {
    return this.ticketsService.findByDriver(
      driverId,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      period,
    );
  }
}

