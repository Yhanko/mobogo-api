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
import { AgentsService } from '@/modules/iam/agents/agents.service';
import { CreateAgentDto } from '@/modules/iam/agents/dto/create-agents.dto';
import { UpdateAgentDto } from '@/modules/iam/agents/dto/update-agents.dto';
import { DelegatePermissionsDto } from '@/modules/iam/agents/dto/delegate-permission.dto';

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
  getActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() admin: JwtPayload,
  ) {
    return this.agentsService.getActivity(id, admin);
  }
}
export function ThrottleMedium(): MethodDecorator {
  // Simple no-op decorator placeholder for medium throttling.
  // Keeps signature compatible with typical NestJS method decorators.
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    // could attach metadata here if needed, e.g. Reflect.defineMetadata(...)
    return descriptor;
  };
}
