import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
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

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productSKU: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  additionalInfos?: string;

  @IsArray()
  @IsOptional()
  // @ArrayNotEmpty()
  images: string[];

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  categories: string[];
}

export class ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
}
