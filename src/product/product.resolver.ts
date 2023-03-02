import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { handleProductFilters, handleProductSorts } from '../utils/helper';
import {
  CreateProductDto,
  ProductFilters,
  UpdateProductDto,
} from 'src/dto/product.dto';
import { sortProduct } from '../utils/config';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('products')
  async products(
    @Args('filters') filters: ProductFilters,
    @Args('sort') sort: sortProduct,
    @Args('limit') limit: number,
    @Args('page') page: number,
  ) {
    try {
      const options = handleProductFilters(filters);
      const sorts = handleProductSorts(sort);
      return this.productService.products(options, page, limit, sorts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query('productDetail')
  async productDetail(@Args('id') id: string) {
    try {
      return this.productService.productDetail(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query('totalProducts')
  async totalProducts() {
    try {
      return this.productService.getTotalProducts();
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occurred while trying to retrieve the total number of products',
      );
    }
  }

  @Query('productsId')
  async productsId() {
    try {
      return this.productService.objectIdArray();
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occurred while trying to retrieve the array of object IDs',
      );
    }
  }

  @Query('minPrice')
  async minPrice() {
    try {
      return this.productService.getMinPrice();
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occurred while trying to retrieve the minimum price',
      );
    }
  }

  @Query('maxPrice')
  async maxPrice() {
    try {
      return this.productService.getMaxPrice();
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occurred while trying to retrieve the maximum price',
      );
    }
  }

  @Mutation('deleteProduct')
  async deleteProduct(@Args('id') id: string) {
    try {
      const product = await this.productService.deleteProduct(id);
      if (product) {
        return {
          success: true,
          msg: 'Delete product successfully',
          data: product,
        };
      } else {
        return {
          success: false,
          msg: 'Delete product failed',
        };
      }
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while trying to delete products');
    }
  }

  @Mutation('updateProduct')
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductDto,
  ) {
    try {
      const product = this.productService.updateProduct(id, input);
      if (product) {
        return {
          success: true,
          msg: 'Update product successfully',
          data: product,
        };
      } else {
        return {
          success: false,
          msg: 'Update product failed',
        };
      }
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while trying to update products');
    }
  }

  @Mutation('createProduct')
  async createProduct(@Args('input') input: CreateProductDto) {
    try {
      const product = this.productService.createProduct(input);
      if (product) {
        return {
          success: true,
          msg: 'Create product successfully',
          data: product,
        };
      } else {
        return {
          success: false,
          msg: 'Create product failed',
        };
      }
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while trying to create products');
    }
  }
}
