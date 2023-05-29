import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
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
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  additionalInfos?: string;

  @IsArray()
  // @IsOptional()
  // @ArrayNotEmpty()
  images: string[];

  @IsArray()
  @ArrayNotEmpty()
  categories: string[];
}
export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  productCode?: string;

  @IsString()
  @IsNotEmpty()
  productSKU?: string;

  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  shortDescription?: string;

  @IsString()
  additionalInfos?: string;

  @IsArray()
  // @IsOptional()
  // @ArrayNotEmpty()
  images?: string[];

  @IsArray()
  @ArrayNotEmpty()
  categories?: string[];
}
export class ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
}
