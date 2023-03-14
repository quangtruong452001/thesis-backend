import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { handleProductFilters, handleProductSorts } from '../utils/helper';
import { ProductFilters } from 'src/dto/product.dto';
import { sortProduct } from '../utils/config';
import { CreateProductInput } from 'src/graphql';

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
  @Query('allProducts')
  async getAllProducts(@Args('filters') filters: ProductFilters) {
    try {
      const options = handleProductFilters(filters);
      return this.productService.getAllProduct(options);
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
  // @Query('recommendProduct')
  // async recommendProduct(@Args('userId') userId: string) {
  //   try {
  //     return this.productService.getRecommend(userId);
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  @Mutation('createProduct')
  async createProduct(@Args('product') createProductDto: CreateProductInput) {
    try {
      return await this.productService.createProduct(createProductDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Mutation('deleteProduct')
  async deleteProduct(id: string) {
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
}
