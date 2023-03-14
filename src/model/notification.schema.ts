import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Reservation } from './reservation.schema';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['RESERVATION', 'ORDER'] })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: false })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Reservation', required: false })
  reservationId: Types.ObjectId;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
// TODO: add middleware if need
