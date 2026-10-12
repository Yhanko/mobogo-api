import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Manuel António',
    description: 'Nome completo do utilizador',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: '+244923112233',
    description: 'Número de telefone internacional (+244...)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, {
    message: 'Telefone inválido. Formato: +244923000000',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: 'TAX-A1B2C3D4',
    description: 'Display ID para passageiro sem telefone (gerado automaticamente se omitido)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^TAX-[A-F0-9]{8}$/, {
    message: 'Display ID inválido. Formato: TAX-XXXXXXXX',
  })
  displayId?: string;

  @ApiProperty({
    example: 'segredo123',
    description: 'Password de acesso (para passageiro sem telefone pode ser PIN de 4 dígitos)',
  })
  @IsString()
  @MinLength(4, { message: 'Credencial mínima de 4 caracteres' })
  @MaxLength(128, { message: 'Credencial demasiado longa' })
  credential: string;

  @ApiProperty({
    enum: Role,
    example: Role.PASSENGER,
    description: 'Perfil de acesso do utilizador',
  })
  @IsEnum(Role, {
    message: `Role inválido. Valores: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}
