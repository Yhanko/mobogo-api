import { IsString, IsOptional, MinLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({
    example: '+244923000000',
    description: 'Telefone do utilizador no formato internacional',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, {
    message: 'Telefone inválido. Formato: +244923000000',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: 'admin@mobgo.co.ao',
    description: 'Display ID ou email do utilizador (se não usar telefone)',
  })
  @IsOptional()
  @IsString()
  displayId?: string;

  @ApiProperty({
    example: 'senhaForte123',
    description: 'Password (para admin/agente/taxista) ou PIN de 4 dígitos (passageiro)',
  })
  @IsString()
  @MinLength(4, { message: 'Credencial deve ter pelo menos 4 caracteres' })
  credential: string;
}
