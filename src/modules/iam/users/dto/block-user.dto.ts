import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BlockUserDto {
  @ApiProperty({
    example: 'Violação dos termos de utilização do serviço',
    description: 'Motivo detalhado do bloqueio da conta',
  })
  @IsString()
  @MinLength(5, { message: 'Motivo deve ter pelo menos 5 caracteres' })
  @MaxLength(255, { message: 'Motivo demasiado longo' })
  reason: string;
}
