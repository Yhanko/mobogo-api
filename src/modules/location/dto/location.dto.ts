import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class EmitLocationDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  speed?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(360)
  heading?: number;
}
