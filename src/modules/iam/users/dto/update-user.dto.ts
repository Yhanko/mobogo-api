import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+\d{9,15}$/, { message: 'Telefone inválido' })
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
