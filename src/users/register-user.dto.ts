import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsOptional()
  address?: string;
}
