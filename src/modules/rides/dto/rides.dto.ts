import { IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketStatus } from '@prisma/client';

export class RidesFilterDto {
  @ApiPropertyOptional({ example: '2026-10-01T00:00:00.000Z', description: 'Data inicial para filtro (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2026-10-31T23:59:59.999Z', description: 'Data final para filtro (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({ enum: TicketStatus, description: 'Estado do ticket da corrida' })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'ID do motorista/taxista' })
  @IsOptional()
  @IsUUID()
  driverId?: string;

  @ApiPropertyOptional({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', description: 'ID do passageiro' })
  @IsOptional()
  @IsUUID()
  passengerId?: string;
}

