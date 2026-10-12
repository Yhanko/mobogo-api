import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'a1b2c3d4e5f67890123456789abcdef...',
    description: 'Refresh token opaco gerado na autenticação',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
