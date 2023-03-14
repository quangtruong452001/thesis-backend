import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from './common.dto';

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FINISHED = 'FINISHED',
  RETURNED = 'RETURNED',
  CANCELED = 'CANCELED',
}

class CartItemInput {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
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
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
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
  @IsString()
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
