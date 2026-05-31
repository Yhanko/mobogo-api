import { IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentCredential: string;

  @IsString()
  @MinLength(6, { message: 'Nova password deve ter no mínimo 6 caracteres' })
  @MaxLength(128, { message: 'Nova password muito longa' })
  newCredential: string;
}
