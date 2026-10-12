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
import { DriverStatus } from '@prisma/client';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Permission } from '@/common/types/permission.enum';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { ThrottleMedium } from '@/common/decorators/throttler.decorator';
import { DriversService } from '@/modules/iam/drivers/driver.service';
import { CreateDriverDto } from '@/modules/iam/drivers/dto/create-drivers.dto';
import { UpdateDriverDto } from '@/modules/iam/drivers/dto/update-drivers.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('drivers')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('iam/drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  /**
   * POST /iam/drivers
   * Cliente adiciona um taxista à sua conta.
   */
  @Post()
  @RequirePermission(Permission.USER_CREATE_WITH_PHONE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Criar / adicionar motorista (Cliente)' })
  @ApiResponse({ status: 201, description: 'Motorista cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou utilizador já é motorista' })
  create(@Body() dto: CreateDriverDto, @CurrentUser() client: JwtPayload) {
    return this.driversService.create(dto, client);
  }

  /**
   * GET /iam/drivers
   * Cliente lista os seus taxistas.
   */
  @Get()
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Listar motoristas associados ao cliente logado' })
  @ApiResponse({ status: 200, description: 'Lista paginada de motoristas' })
  findAll(
    @CurrentUser() client: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: DriverStatus,
  ) {
    return this.driversService.findAll(
      client.sub,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      { status },
    );
  }

  /**
   * GET /iam/drivers/me
   * Taxista vê o seu próprio perfil.
   */
  @Get('me')
  @ThrottleMedium()
  @ApiOperation({ summary: 'Obter perfil do próprio motorista logado' })
  @ApiResponse({ status: 200, description: 'Dados do perfil do motorista' })
  getMe(@CurrentUser() driver: JwtPayload) {
    // Resolve driverId a partir do userId via service
    return this.driversService.findDriverByUserId(driver.sub);
  }

  /**
   * GET /iam/drivers/:id
   * Ver perfil completo de um taxista.
   */
  @Get(':id')
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Obter perfil completo de um motorista por ID' })
  @ApiResponse({ status: 200, description: 'Dados completos do motorista' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.findOne(id, requester);
  }

  /**
   * PATCH /iam/drivers/:id
   * Actualizar matrícula ou dias de trabalho.
   */
  @Patch(':id')
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Atualizar dados de um motorista (matrícula, limites)' })
  @ApiResponse({ status: 200, description: 'Motorista atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDriverDto,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.update(id, dto, requester);
  }

  /**
   * PATCH /iam/drivers/:id/work-days
   * Definir dias de trabalho do taxista.
   * Aceita: [1,2,3,4,5] (seg-sex) ou [0,6] (fim de semana)
   */
  @Patch(':id/work-days')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Definir dias de trabalho do motorista' })
  @ApiResponse({ status: 200, description: 'Dias de trabalho definidos com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  setWorkDays(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('workDays') workDays: number[],
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.setWorkDays(id, workDays, requester);
  }

  /**
   * PATCH /iam/drivers/:id/activate
   * Cliente activa taxista inactivo.
   */
  @Patch(':id/activate')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.USER_ACTIVATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Ativar motorista inativo' })
  @ApiResponse({ status: 200, description: 'Motorista ativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  activate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.setStatus(id, DriverStatus.ACTIVE, requester);
  }

  /**
   * PATCH /iam/drivers/:id/deactivate
   * Cliente desactiva taxista.
   */
  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.USER_ACTIVATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Desativar motorista' })
  @ApiResponse({ status: 200, description: 'Motorista desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  deactivate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.setStatus(id, DriverStatus.INACTIVE, requester);
  }

  /**
   * PATCH /iam/drivers/:id/block
   * Admin ou cliente bloqueia taxista.
   * Remove localização do Redis imediatamente.
   */
  @Patch(':id/block')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.USER_BLOCK)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Bloquear motorista' })
  @ApiResponse({ status: 200, description: 'Motorista bloqueado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  block(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.setStatus(id, DriverStatus.BLOCKED, requester);
  }

  /**
   * GET /iam/drivers/:id/balance
   * Saldo actual do taxista — carteira e corridas do mês.
   */
  @Get(':id/balance')
  @RequirePermission(Permission.WALLET_VIEW)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Consultar saldo atual e receita mensal do motorista' })
  @ApiResponse({ status: 200, description: 'Saldo e ganhos do motorista' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  getBalance(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.getBalance(id, requester);
  }

  /**
   * GET /iam/drivers/:id/payments
   * Histórico de recebimentos do taxista.
   */
  @Get(':id/payments')
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Histórico de pagamentos/recebimentos do motorista' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos efetuados' })
  getPaymentHistory(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @CurrentUser() requester?: JwtPayload,
  ) {
    return this.driversService.getPaymentHistory(
      id,
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      requester!,
    );
  }

  /**
   * GET /iam/drivers/:id/lotadores
   * Ver lotadores parceiros do taxista.
   */
  @Get(':id/lotadores')
  @RequirePermission(Permission.TICKET_VIEW_HISTORY)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Listar lotadores parceiros do motorista' })
  @ApiResponse({ status: 200, description: 'Lista de lotadores parceiros' })
  getLotadorPartners(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() requester: JwtPayload,
  ) {
    return this.driversService.getLotadorPartners(id, requester);
  }
}

