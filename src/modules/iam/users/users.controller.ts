import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
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
import { UsersService } from '@/modules/iam/users/users.service';
import { CreateUserDto } from '@/modules/iam/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/iam/users/dto/update-user.dto';
import { BlockUserDto } from '@/modules/iam/users/dto/block-user.dto';
import { Role } from '@prisma/client';

@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('iam/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /iam/users
   * Admin ou agente cria um novo utilizador.
   * Suporta todos os roles: passageiro com/sem telefone,
   * taxista, cliente, agente, lotador.
   */
  @Post()
  @ThrottleMedium()
  @RequirePermission(Permission.USER_CREATE_WITH_PHONE)
  @ApiOperation({ summary: 'Criar novo utilizador (com telefone)' })
  @ApiResponse({
    status: 201,
    description: 'Utilizador criado com sucesso',
    schema: {
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Manuel Fernandes',
        phone: '+244923000111',
        role: 'PASSENGER',
        displayId: 'MF-8291',
        isActive: true,
        isBlocked: false,
        createdAt: '2026-10-12T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou telefone já cadastrado',
    schema: {
      example: {
        statusCode: 400,
        message: 'Telefone já cadastrado',
        error: 'Bad Request',
      },
    },
  })
  create(@Body() dto: CreateUserDto, @CurrentUser() user: JwtPayload) {
    return this.usersService.create(dto, user);
  }

  /**
   * POST /iam/users/no-phone
   * Cria passageiro sem telefone (gera displayId automaticamente).
   */
  @Post('no-phone')
  @ThrottleMedium()
  @RequirePermission(Permission.USER_CREATE_WITHOUT_PHONE)
  @ApiOperation({ summary: 'Criar passageiro sem telefone (gera displayId)' })
  @ApiResponse({
    status: 201,
    description: 'Passageiro sem telefone criado com sucesso',
    schema: {
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Passageiro Anônimo',
        role: 'PASSENGER',
        displayId: 'PASS-98213',
        isActive: true,
        isBlocked: false,
        createdAt: '2026-10-12T12:00:00.000Z',
      },
    },
  })
  createWithoutPhone(
    @Body() dto: CreateUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    // Garante que não tem telefone
    delete dto.phone;
    return this.usersService.create(dto, user);
  }

  /**
   * GET /iam/users
   * Admin lista todos os utilizadores com filtros opcionais.
   */
  @Get()
  @ThrottleMedium()
  @RequirePermission(Permission.USER_VIEW_ALL)
  @ApiOperation({ summary: 'Listar todos os utilizadores com filtros (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista paginada de utilizadores' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('role') role?: Role,
    @Query('isActive') isActive?: string,
    @Query('isBlocked') isBlocked?: string,
  ) {
    return this.usersService.findAll(
      {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
      {
        role,
        isActive: isActive !== undefined ? isActive === 'true' : undefined,
        isBlocked: isBlocked !== undefined ? isBlocked === 'true' : undefined,
      },
    );
  }

  /**
   * GET /iam/users/search
   * Pesquisa utilizador por telefone ou displayId.
   */
  @Get('search')
  @ThrottleMedium()
  @RequirePermission(Permission.USER_VIEW_ALL)
  @ApiOperation({ summary: 'Pesquisar utilizador por telefone ou displayId' })
  @ApiResponse({ status: 200, description: 'Lista de utilizadores encontrados' })
  search(@Query('q') query: string) {
    return this.usersService.search(query);
  }

  /**
   * GET /iam/users/me
   * Qualquer utilizador vê o seu próprio perfil.
   */
  @Get('me')
  @ThrottleMedium()
  @ApiOperation({ summary: 'Obter perfil do próprio utilizador logado' })
  @ApiResponse({ status: 200, description: 'Dados do perfil do utilizador autenticado' })
  getMe(@CurrentUser() user: JwtPayload) {
    return this.usersService.findOne(user.sub);
  }

  /**
   * GET /iam/users/:id
   * Admin vê o perfil de qualquer utilizador.
   */
  @Get(':id')
  @ThrottleMedium()
  @RequirePermission(Permission.USER_VIEW_ALL)
  @ApiOperation({ summary: 'Obter perfil de um utilizador por ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Dados do utilizador' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * PATCH /iam/users/:id
   * Actualiza dados básicos de um utilizador.
   */
  @Patch(':id')
  @ThrottleMedium()
  @RequirePermission(Permission.USER_ACTIVATE)
  @ApiOperation({ summary: 'Atualizar dados básicos de um utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  /**
   * PATCH /iam/users/:id/block
   * Bloqueia utilizador com motivo obrigatório.
   */
  @Patch(':id/block')
  @ThrottleMedium()
  @RequirePermission(Permission.USER_BLOCK)
  @ApiOperation({ summary: 'Bloquear utilizador com motivo' })
  @ApiResponse({ status: 200, description: 'Utilizador bloqueado com sucesso' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  block(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: BlockUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usersService.block(id, dto, user);
  }

  /**
   * PATCH /iam/users/:id/unblock
   * Desbloqueia utilizador.
   */
  @Patch(':id/unblock')
  @HttpCode(HttpStatus.OK)
  @ThrottleMedium()
  @RequirePermission(Permission.USER_BLOCK)
  @ApiOperation({ summary: 'Desbloquear utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador desbloqueado com sucesso' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  unblock(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usersService.unblock(id, user);
  }

  /**
   * PATCH /iam/users/:id/activate
   * Activa utilizador inactivo.
   */
  @Patch(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ThrottleMedium()
  @RequirePermission(Permission.USER_ACTIVATE)
  @ApiOperation({ summary: 'Ativar utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador ativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  activate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usersService.setActive(id, true, user);
  }

  /**
   * PATCH /iam/users/:id/deactivate
   * Desactiva utilizador.
   */
  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ThrottleMedium()
  @RequirePermission(Permission.USER_ACTIVATE)
  @ApiOperation({ summary: 'Desativar utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  deactivate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usersService.setActive(id, false, user);
  }

  /**
   * DELETE /iam/users/:id
   * Soft delete — admin elimina utilizador.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ThrottleMedium()
  @RequirePermission(Permission.USER_BLOCK)
  @ApiOperation({ summary: 'Remover utilizador (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Utilizador removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usersService.remove(id, user);
  }
}

