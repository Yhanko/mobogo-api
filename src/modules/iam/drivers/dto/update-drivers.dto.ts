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

export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$/, {
    message: 'Matrícula inválida. Formato: LD-00-00-AA',
  })
  licensePlate?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  workDays?: number[];

  @IsOptional()
  @IsEnum(DriverStatus)
  status?: DriverStatus;
}
