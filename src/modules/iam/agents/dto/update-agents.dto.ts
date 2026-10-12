import {
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
  Max,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Permission } from '@/common/types/permission.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAgentDto {
  @ApiPropertyOptional({
    example: 150,
    description: 'Novo limite diário de emissão de passagens',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  dailyTicketLimit?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Ativar ou desativar o agente',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    isArray: true,
    enum: Permission,
    example: [Permission.TICKET_CREATE, Permission.TICKET_SCAN],
    description: 'Atualização das permissões delegadas ao agente',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[];
}
