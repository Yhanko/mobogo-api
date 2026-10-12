import {
  IsUUID,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Permission } from '@/common/types/permission.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({
    example: 'd9b2d63d-a233-4123-8472-123456789abc',
    description: 'ID (UUID) do utilizador existente que será promovido a agente',
  })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    example: 100,
    default: 100,
    description: 'Limite diário de passagens que o agente pode emitir',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  dailyTicketLimit?: number;

  @ApiPropertyOptional({
    isArray: true,
    enum: Permission,
    example: [Permission.TICKET_CREATE, Permission.TICKET_SCAN],
    description: 'Subconjunto de permissões delegadas pelo administrador ao agente',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[];
}
