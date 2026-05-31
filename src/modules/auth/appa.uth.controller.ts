import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { type JwtPayload } from '../../common/types/jwt-payload.type';
import {
  ThrottleStrict,
  ThrottleDefault,
  SkipThrottle,
} from '../../common/decorators/throttle.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/login
   * Limite estrito: 5 tentativas por minuto por IP.
   * Protege contra brute force de passwords e PINs.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ThrottleStrict()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * POST /auth/refresh
   * Limite estrito: token rotation não deve ser chamado em loop.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ThrottleStrict()
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  /**
   * POST /auth/logout
   * Sem throttle — logout deve ser sempre permitido.
   */
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SkipThrottle()
  @SkipThrottle()
  logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  /**
   * POST /auth/change-password
   * Limite estrito — operação sensível.
   */
  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ThrottleStrict()
  changePassword(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.sub, dto);
  }
}
