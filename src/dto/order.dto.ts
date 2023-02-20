import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  productId: string;

  @IsNotEmpty()
  @IsString()
  quantity: number;
}

class InfoInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;
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
