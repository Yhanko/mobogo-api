import {
  IsUUID,
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateDriverDto {
  @IsUUID()
  userId: string; // utilizador com role DRIVER já existente

  @IsString()
  @Matches(/^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$/, {
    message: 'Matrícula inválida. Formato: LD-00-00-AA',
  })
  licensePlate: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  workDays?: number[]; // 0=Dom 1=Seg ... 6=Sáb — default: [1,2,3,4,5]
}
