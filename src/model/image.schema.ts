import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type imageDocument = Image & Document;

@Schema()
export class Image {
  // @Prop()
  // id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  image_name: string;
  @Prop({ required: true })
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
