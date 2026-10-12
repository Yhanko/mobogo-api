import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Manuel António da Silva',
    description: 'Nome atualizado do utilizador',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: '+244923998877',
    description: 'Telefone atualizado',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, { message: 'Telefone inválido' })
  phone?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado de ativação da conta',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
