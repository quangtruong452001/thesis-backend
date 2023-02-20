import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HourDocument = Hour & Document;

@Schema()
export class Hour {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  timeFrame: string;

  @Prop({ required: true })
  slot: number;
}

export const HourSchema = SchemaFactory.createForClass(Hour);
