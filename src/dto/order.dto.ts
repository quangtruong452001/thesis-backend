import {
  // Equals,
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from './common.dto';

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FINISHED = 'FINISHED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

class CartItemInput {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  image: ImageDto[];
}

class InfoInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(99)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @Matches(/^\d{10}$/)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  // @Equals('Hồ Chí Minh')
  region: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  ward: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  orderComment?: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}

export class CreateOrderInput {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemInput)
  cart: CartItemInput[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => InfoInput)
  bill: InfoInput;

  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsOptional()
  @IsString()
  payment?: string;

  @IsNotEmpty()
  @IsString()
  shippingTime: string;

  @IsNotEmpty()
  shippingFee: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}

export class UpdateOrderInput {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemInput)
  cart?: CartItemInput[];

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoInput)
  bill?: InfoInput;

  // @IsOptional()
  // @IsString()
  // user?: string;

  @IsOptional()
  @IsString()
  payment?: string;

  @IsOptional()
  @IsString()
  shippingTime?: string;

  @IsOptional()
  shippingFee?: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}

export class OrderFilter {
  status: OrderStatus;
}
