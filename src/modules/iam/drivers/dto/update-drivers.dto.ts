import {
  IsOptional,
  IsArray,
  IsInt,
  IsEnum,
  Min,
  Max,
  IsString,
  Matches,
} from 'class-validator';
import { DriverStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDriverDto {
  @ApiPropertyOptional({
    example: 'LD-99-88-ZZ',
    description: 'Nova matrícula do veículo (formato: LD-00-00-AA)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$/, {
    message: 'Matrícula inválida. Formato: LD-00-00-AA',
  })
  licensePlate?: string;

  @ApiPropertyOptional({
    example: [1, 2, 3, 4, 5, 6],
    description: 'Dias da semana em que o motorista opera',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  workDays?: number[];

  @ApiPropertyOptional({
    enum: DriverStatus,
    example: DriverStatus.ACTIVE,
    description: 'Estado operacional do taxista (ACTIVE | INACTIVE | ON_TRIP | BLOCKED)',
  })
  @IsOptional()
  @IsEnum(DriverStatus)
  status?: DriverStatus;
}
