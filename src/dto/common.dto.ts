import { IsString, IsUrl, IsDate, IsMongoId } from 'class-validator';

export class ImageDto {
  @IsMongoId()
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
