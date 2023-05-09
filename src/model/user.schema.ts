import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Image } from './image.schema';
// import { Reservation } from 'src/graphql';

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

  @Prop({ enum: ['USER', 'ADMIN', 'STAFF'], default: 'USER' })
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

  // prop for staff
  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  })
  avatar: Image;

  @Prop()
  phone: string;

  // @Prop({
  //   type: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Reservation',
  //     },
  //   ],
  // })
  // reservationsAssign: Reservation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
