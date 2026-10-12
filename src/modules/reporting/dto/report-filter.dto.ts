import { IsOptional, IsDateString, IsUUID, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum ReportPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range',
}

export enum ReportFormat {
  JSON = 'json',
  CSV = 'csv',
}

export class ReportFilterDto {
  @ApiPropertyOptional({ enum: ReportPeriod, default: ReportPeriod.DAY, description: 'Período do relatório' })
  @IsOptional()
  @IsEnum(ReportPeriod)
  period?: ReportPeriod = ReportPeriod.DAY;

  @ApiPropertyOptional({ example: '2026-10-01T00:00:00.000Z', description: 'Data de início (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2026-10-31T23:59:59.999Z', description: 'Data de término (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Filtrar por motorista' })
  @IsOptional()
  @IsUUID()
  driverId?: string;

  @ApiPropertyOptional({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', description: 'Filtrar por cliente/empresa' })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiPropertyOptional({ enum: ReportFormat, default: ReportFormat.JSON, description: 'Formato do relatório (json ou csv)' })
  @IsOptional()
  @IsEnum(ReportFormat)
  format?: ReportFormat = ReportFormat.JSON;
}

