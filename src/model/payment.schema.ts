import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  externalId: string;

  @Prop({ required: true })
  payerFistName: string;

  @Prop({ required: true })
  payerLastName: string;

  @Prop({ required: true })
  currencyCode: string;

  @Prop({ required: true })
  totalAmount: string;

  @Prop({ required: true })
  type: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
