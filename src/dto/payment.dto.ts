import { IsNotEmpty, IsString } from 'class-validator';

export class Payment {
  @IsNotEmpty()
  @IsString()
  externalId: string;

  @IsNotEmpty()
  @IsString()
  payerFistName: string;

  @IsNotEmpty()
  @IsString()
  payerLastName: string;

  @IsNotEmpty()
  @IsString()
  currencyCode: string;

  @IsNotEmpty()
  @IsString()
  totalAmount: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}

export class createPaymentInput {
  @IsNotEmpty()
  @IsString()
  externalId: string;

  @IsNotEmpty()
  @IsString()
  payerFistName: string;

  @IsNotEmpty()
  @IsString()
  payerLastName: string;

  @IsNotEmpty()
  @IsString()
  currencyCode: string;

  @IsNotEmpty()
  @IsString()
  totalAmount: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}
