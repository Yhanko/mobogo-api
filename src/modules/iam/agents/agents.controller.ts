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
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RbacGuard } from '@/common/guards/rbac.guard';
import { RequirePermission } from '@/common/decorators/require-permission.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Permission } from '@/common/types/permission.enum';
import { type JwtPayload } from '@/common/types/jwt-payload.type';
import { ThrottleMedium } from '@/common/decorators/throttler.decorator';
import { AgentsService } from '@/modules/iam/agents/agents.service';
import { CreateAgentDto } from '@/modules/iam/agents/dto/create-agents.dto';
import { UpdateAgentDto } from '@/modules/iam/agents/dto/update-agents.dto';
import { DelegatePermissionsDto } from '@/modules/iam/agents/dto/delegate-permission.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('agents')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('iam/agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  /**
   * POST /iam/agents
   * Admin vincula um utilizador com role AGENT ao seu perfil de agente.
   */
  @Post()
  @ThrottleMedium()
  @RequirePermission(Permission.AGENT_CREATE)
  @ApiOperation({ summary: 'Vincular utilizador como agente (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Perfil de agente criado com sucesso',
    schema: {
      example: {
        id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        adminId: 'd4e5f6a7-b8c9-0123-def0-234567890123',
        dailyLimit: 100000,
        permissions: ['ticket:create', 'ticket:view:history'],
        isActive: true,
        createdAt: '2026-10-12T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Utilizador não é AGENT ou já é agente',
    schema: {
      example: {
        statusCode: 400,
        message: 'Utilizador não tem role AGENT ou já possui perfil',
        error: 'Bad Request',
      },
    },
  })
  create(@Body() dto: CreateAgentDto, @CurrentUser() admin: JwtPayload) {
    return this.agentsService.create(dto, admin);
  }

  /**
   * GET /iam/agents
   * Admin lista os seus próprios agentes.
   */
  @Get()
  @RequirePermission(Permission.AGENT_CREATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Listar agentes do admin logado' })
  @ApiResponse({ status: 200, description: 'Lista paginada de agentes' })
  findAll(
    @CurrentUser() admin: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.agentsService.findAll(admin.sub, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * GET /iam/agents/:id
   * Admin vê detalhes de um agente seu.
   */
  @Get(':id')
  @RequirePermission(Permission.AGENT_CREATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Obter detalhes de um agente por ID' })
  @ApiResponse({ status: 200, description: 'Dados do agente' })
  @ApiResponse({ status: 404, description: 'Agente não encontrado' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.findOne(id, admin);
  }

  /**
   * PATCH /iam/agents/:id
   * Actualiza limite diário, permissões ou estado do agente.
   */
  @Patch(':id')
  @RequirePermission(Permission.AGENT_CREATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Atualizar dados/limites de um agente' })
  @ApiResponse({ status: 200, description: 'Agente atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Agente não encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAgentDto,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.update(id, dto, admin);
  }

  /**
   * PATCH /iam/agents/:id/permissions
   * Admin delega permissões específicas ao agente.
   * Substitui as permissões actuais pelo novo conjunto.
   */
  @Patch(':id/permissions')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.AGENT_DELEGATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Delegar permissões específicas ao agente' })
  @ApiResponse({ status: 200, description: 'Permissões delegadas com sucesso' })
  @ApiResponse({ status: 400, description: 'Permissões inválidas' })
  delegatePermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: DelegatePermissionsDto,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.delegatePermissions(id, dto, admin);
  }

  /**
   * PATCH /iam/agents/:id/activate
   * Activa agente — restaura as suas permissões delegadas.
   */
  @Patch(':id/activate')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.AGENT_DEACTIVATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Ativar agente' })
  @ApiResponse({ status: 200, description: 'Agente ativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Agente não encontrado' })
  activate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.setActive(id, true, admin);
  }

  /**
   * PATCH /iam/agents/:id/deactivate
   * Desactiva agente — perde permissões delegadas imediatamente.
   */
  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(Permission.AGENT_DEACTIVATE)
  @ThrottleMedium()
  @ApiOperation({ summary: 'Desativar agente' })
  @ApiResponse({ status: 200, description: 'Agente desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Agente não encontrado' })
  deactivate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.setActive(id, false, admin);
  }

  /**
   * GET /iam/agents/:id/activity
   * Ver actividade do agente — tickets emitidos hoje e no mês.
   */
  @Get(':id/activity')
  @ThrottleMedium()
  @RequirePermission(Permission.AGENT_CREATE)
  @ApiOperation({ summary: 'Ver atividade recente do agente (tickets emitidos)' })
  @ApiResponse({ status: 200, description: 'Métricas de emissão de bilhetes do agente' })
  getActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.getActivity(id, admin);
  }
}

