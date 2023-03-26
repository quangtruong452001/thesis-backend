import { IsNotEmpty } from 'class-validator';

export class imageDto {
  @IsNotEmpty()
  image_name: string;

  @IsNotEmpty()
  url: string;
}
