import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashPassword: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ enum: ['USER', 'ADMIN'], default: 'USER' })
  role: string;

  @Prop({ default: 0 })
  canceledAppointments: number;

  @Prop({ default: 0 })
  canceledOrders: number;

  @Prop({ default: 0 })
  orderCount: number;

  @Prop({ default: 0 })
  reservationCount: number;

  @Prop({ default: 0 })
  successfulAppointments: number;

  @Prop({ default: 0 })
  successfulOrders: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
