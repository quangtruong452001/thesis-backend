import { Module } from '@nestjs/common';
import { Category, CategorySchema } from '../model/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Product, ProductSchema } from '../model/product.schema';
import { Image, ImageSchema } from '../model/image.schema';
import { ProductResolver } from './product.resolver';
import { OrderService } from 'src/order/order.service';
import { OrderSchema, Order } from 'src/model/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Image.name, schema: ImageSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [ProductService, ProductResolver, OrderService],
})
export class ProductModule {}
