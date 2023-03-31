import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Category } from './category.schema';
import { Hour } from './hour.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({
    // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
  })
  species: string;

  @Prop({ type: String, required: true })
  breed: string;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ type: Date, required: true })
  reservationDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Hour' })
  reservationHour: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ServiceType',
  })
  serviceType: string;

  @Prop({ type: String, enum: ['HOME', 'STORE'], required: true })
  locationType: string;

  @Prop({
    type: {
      region: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      address: { type: String, required: true },
      description: { type: String },
    },
    required: true,
  })
  location: {
    region: string;
    district: string;
    ward: string;
    address: string;
    description?: string;
  };

  @Prop({ type: String })
  note: string;

  @Prop({
    type: String,
    enum: ['BOOKED', 'SUCCESS', 'CANCELLED'],
    required: true,
  })
  status: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
