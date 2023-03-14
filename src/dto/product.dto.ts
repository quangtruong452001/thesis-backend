import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  productSKU: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  shortDescription?: string;

  @IsString()
  additionalInfos?: string;

  @IsArray()
  // @ArrayNotEmpty()
  images: string[];

  @IsArray()
  @ArrayNotEmpty()
  categories: string[];
}

export class ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
}
