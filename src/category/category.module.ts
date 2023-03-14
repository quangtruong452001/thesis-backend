import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../model/product.schema';
import { Category, CategorySchema } from '../model/category.schema';
import { ProductService } from '../product/product.service';
import { ProductResolver } from '../product/product.resolver';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { Order, OrderSchema } from '../model/order.schema';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [ProductService, CategoryService, CategoryResolver, OrderService],
})
export class CategoryModule {}
