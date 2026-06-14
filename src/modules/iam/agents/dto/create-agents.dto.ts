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

export class CreateAgentDto {
  @IsUUID()
  userId: string; // utilizador já existente que será promovido a agente

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  dailyTicketLimit?: number; // default: 100 definido no service

  @IsOptional()
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[]; // subset das permissões do admin
}
