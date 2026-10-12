import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmitLocationDto {
  @ApiProperty({
    example: -8.83833,
    description: 'Latitude da coordenada GPS (-90 a 90)',
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({
    example: 13.23444,
    description: 'Longitude da coordenada GPS (-180 a 180)',
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @ApiPropertyOptional({
    example: 45.5,
    description: 'Velocidade do veículo em km/h',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  speed?: number;

  @ApiPropertyOptional({
    example: 180,
    description: 'Direção do movimento (heading / rumo) em graus (0 a 360)',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(360)
  heading?: number;
}
