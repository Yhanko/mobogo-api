import { IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { TicketStatus } from '@/prisma';

export class RidesFilterDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsUUID()
  driverId?: string;

  @IsOptional()
  @IsUUID()
  passengerId?: string;
}
