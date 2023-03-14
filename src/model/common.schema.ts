import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop()
  url: string;
}

@Schema({ _id: false })
export class Bill {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  company: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
  district: string;

  @Prop()
  ward: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  orderComment: string;

  @Prop({ required: true })
  paymentMethod: string;
}

@Schema({ _id: false })
export class Cart {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  images: Image[];
}

@Schema({ timestamps: false, _id: false })
export class Info {
  @Prop({ require: true })
  firstName: string;

  @Prop({ require: true })
  lastName: string;

  @Prop({ require: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  company: string;

  @Prop({ require: true })
  region: string;

  @Prop({ require: true })
  district: string;

  @Prop({ require: true })
  ward: string;

  @Prop({ require: true })
  address: string;

  @Prop()
  orderComment: string;

  @Prop({ require: true })
  paymentMethod: string;
}

export const InfoSchema = SchemaFactory.createForClass(Info);

export const ImageSchema = SchemaFactory.createForClass(Image);

export const BillSchema = SchemaFactory.createForClass(Bill);

export const CartSchema = SchemaFactory.createForClass(Cart);
