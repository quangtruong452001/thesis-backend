import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsOptional,
  ArrayMinSize,
  ValidateNested,
} from "class-validator";

class ServicePrice {
  @IsString()
  name: string;
  @IsNumber()
  serviceId: number;
  @IsString()
  price: string;
  @IsNumber()
  priceNumber: number;
  @IsNumber()
  minWeight: number;
  @IsNumber()
  maxWeight: number;
  @IsOptional()
  updatedAt: Date;
}

export class ServiceTypeInput {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ServicePrice)
  @ArrayMinSize(1)
  price: ServicePrice[];

  @IsString()
  description: string;

  @IsString()
  timeServe: string;

  @IsNumber()
  typeId: number;
}

export class UpdateServiceTypeInput {
  @IsOptional()
  _id: string;

  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ServicePrice)
  @ArrayMinSize(1)
  price: ServicePrice[];

  @IsString()
  description: string;

  @IsString()
  timeServe: string;

  @IsNumber()
  typeId: number;
}
