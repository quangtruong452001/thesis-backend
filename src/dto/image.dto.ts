import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class imageDto {
  @IsString()
  @IsNotEmpty()
  image_name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
