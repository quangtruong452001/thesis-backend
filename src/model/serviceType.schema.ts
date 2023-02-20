import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceTypeDocument = ServiceType & Document;

@Schema()
export class ServiceType {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  price: {
    name: string;
    serviceId: number;
    price: string;
    priceNumber: number;
    minWeight: number;
    maxWeight: number;
    updatedAt: Date;
  }[];

  @Prop()
  selectedCount: number;

  @Prop()
  description: string;

  @Prop()
  timeServe: string;

  @Prop()
  type: string;
}

export const ServiceTypeSchema = SchemaFactory.createForClass(ServiceType);
