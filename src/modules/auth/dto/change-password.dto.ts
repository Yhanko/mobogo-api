import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'senhaAtual123',
    description: 'Password ou PIN atual',
  })
  @IsString()
  currentCredential: string;

  @ApiProperty({
    example: 'novaSenhaForte456',
    description: 'Nova password (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6, { message: 'Nova password deve ter no mínimo 6 caracteres' })
  @MaxLength(128, { message: 'Nova password muito longa' })
  newCredential: string;
}
