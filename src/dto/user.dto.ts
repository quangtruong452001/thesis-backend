import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  ArrayMinSize,
  IsEmail,
  IsPhoneNumber,
  Matches,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  // Validate phone number ten digits
  @Matches(/^\d{10}$/)
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
  @Matches(/^\d{10}$/)
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
  @Matches(/^\d{10}$/)
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
  @Matches(/^\d{10}$/)
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
