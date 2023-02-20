import { Module } from '@nestjs/common';
import { Category, CategorySchema } from '../model/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Product, ProductSchema } from '../model/product.schema';
import { Image, ImageSchema } from '../model/image.schema';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Image.name, schema: ImageSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
