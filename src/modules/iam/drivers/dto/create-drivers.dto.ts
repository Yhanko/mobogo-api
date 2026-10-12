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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({
    example: 'a2b3c4d5-e6f7-4890-abcd-123456789abc',
    description: 'ID (UUID) do utilizador com perfil DRIVER já criado',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'LD-12-34-AB',
    description: 'Matrícula do veículo no padrão oficial angolano: LD-00-00-AA',
  })
  @IsString()
  @Matches(/^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$/, {
    message: 'Matrícula inválida. Formato: LD-00-00-AA',
  })
  licensePlate: string;

  @ApiPropertyOptional({
    example: [1, 2, 3, 4, 5],
    default: [1, 2, 3, 4, 5],
    description: 'Dias de trabalho da semana (0=Domingo, 1=Segunda, ..., 6=Sábado)',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  workDays?: number[];
}
