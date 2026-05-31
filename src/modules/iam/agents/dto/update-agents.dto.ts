import {
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
  Max,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Permission } from '../../../../common/types/permission.enum';

export class UpdateAgentDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  dailyTicketLimit?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[];
}
