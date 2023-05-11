import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatar: string;
}
export class CreateUserInput {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty()
  password: string;
}
export class UpdateUserInput {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  phone: string;
}
export class UpdateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatar: string;
}
