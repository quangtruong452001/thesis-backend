import { IsString, IsUrl, IsDate } from 'class-validator';

export class ImageDto {
  @IsString()
  _id: string;

  @IsString()
  image_name: string;

  @IsUrl()
  url: string;

  // @IsDate()
  // createdAt: Date;
  //
  // @IsDate()
  // updatedAt: Date;
}
