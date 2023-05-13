import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Info, InfoSchema, Cart, CartSchema } from './common.schema';

import * as paginate from 'mongoose-paginate-v2';
import { Product, ProductSchema } from './product.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: [CartSchema] })
  cart: Cart[];

  @Prop({ required: true, type: InfoSchema })
  bill: Info;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  })
  payment: string;

  @Prop({ required: true })
  shippingTime: string;

  @Prop({ required: true })
  shippingFee: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    default: 'PENDING',
    enum: ['PENDING', 'CONFIRMED', 'FINISHED', 'RETURNED', 'CANCELLED'],
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
function applyPaginatePlugin(schema: mongoose.Schema<Order>) {
  schema.plugin(paginate);
}
applyPaginatePlugin(OrderSchema);
// OrderSchema.plugin(paginate);
