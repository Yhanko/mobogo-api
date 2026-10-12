import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RefreshTokenDto } from '@/modules/auth/dto/refresh-token.dto';
import { ChangePasswordDto } from '@/modules/auth/dto/change-password.dto';
import { RegisterAdminDto } from '@/modules/auth/dto/register-admin.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { type JwtPayload } from '@/common/types/jwt-payload.type';
import {
  ThrottleStrict,
  SkipThrottle,
} from '@/common/decorators/throttler.decorator';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register-admin
   * Registo inicial do Super Admin.
   */
  @Public()
  @Post('register-admin')
  @HttpCode(HttpStatus.CREATED)
  @SkipThrottle()
  @ApiOperation({ summary: 'Registar administrador inicial' })
  @ApiResponse({
    status: 201,
    description: 'Administrador registado com sucesso',
    schema: {
      example: {
        message: 'Super Admin registado com sucesso',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou administrador já existente',
    schema: {
      example: {
        statusCode: 400,
        message: 'Email já se encontra em uso.',
        error: 'Bad Request',
      },
    },
  })
  registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto);
  }

  /**
   * POST /auth/login
   * Limite estrito: 5 tentativas por minuto por IP.
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ThrottleStrict()
  @ApiOperation({ summary: 'Autenticar utilizador (Login com telefone ou displayId)' })
  @ApiResponse({
    status: 200,
    description: 'Login efetuado com sucesso, retorna tokens de acesso',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwMTIiLCJyb2xlIjoiQURNSU4iLCJwZXJtaXNzaW9ucyI6WyJhbGwiXX0.example',
        refreshToken: '4f6a8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
        expiresIn: 900,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciais inválidas',
        error: 'Unauthorized',
      },
    },
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * POST /auth/refresh
   */
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ThrottleStrict()
  @ApiOperation({ summary: 'Renovar access token através do refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Token renovado com sucesso',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
        expiresIn: 900,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido ou expirado',
    schema: {
      example: {
        statusCode: 401,
        message: 'Refresh token inválido ou expirado',
        error: 'Unauthorized',
      },
    },
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  /**
   * POST /auth/logout
   */
  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SkipThrottle()
  @ApiOperation({ summary: 'Terminar sessão (Logout e invalidação de refresh token)' })
  @ApiResponse({ status: 204, description: 'Sessão terminada com sucesso' })
  logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  /**
   * POST /auth/change-password
   */
  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ThrottleStrict()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Alterar password ou PIN do utilizador autenticado' })
  @ApiResponse({ status: 204, description: 'Password alterada com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Não autenticado ou credencial atual incorreta',
    schema: {
      example: {
        statusCode: 401,
        message: 'Não autenticado ou credencial atual incorreta',
        error: 'Unauthorized',
      },
    },
  })
  changePassword(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.sub, dto);
  }
}

