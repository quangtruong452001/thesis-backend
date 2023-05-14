import { Module } from '@nestjs/common';
import { Category, CategorySchema } from '../model/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Product, ProductSchema } from '../model/product.schema';
import { Image, ImageSchema } from '../model/image.schema';
import { ProductResolver } from './product.resolver';
import { OrderService } from '../order/order.service';
import { OrderSchema, Order } from '../model/order.schema';
import { Payment, PaymentSchema } from '../model/payment.schema';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Image.name, schema: ImageSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Order.name, schema: OrderSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  providers: [ProductService, ProductResolver, OrderService, ImageService],
})
export class ProductModule {}
