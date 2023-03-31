import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { handleProductFilters, handleProductSorts } from '../utils/helper';
import { CreateProductDto, ProductFilters } from 'src/dto/product.dto';
import { sortProduct } from '../utils/config';
import { CreateProductInput } from 'src/graphql';
import { GetUser } from '../decorator';
import { ImageService } from '../image/image.service';
@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}

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
  @Query('recommendProduct')
  async recommendProduct(@GetUser() user: any) {
    try {
      const userId = user.id;
      return this.productService.getRecommend(userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Mutation('createProduct')
  async createProduct(
    @Args('product') createProductDto: CreateProductInput,
    @Args({
      name: 'files',
      type: async () => {
        return [(await import('graphql-upload/GraphQLUpload.mjs')).default];
      },
    })
    files, // Test upload file
  ) {
    try {
      console.log(files);
      let imgs = [];
      // for (let i = 0; i < fileList.length; i++) {
      //   const img = fileList[i];
      //   // console.log(img);
      //   const image = await this.imageService.createImage(img);
      //   // console.log(image);
      //   imgs.push(image.id);
      for (const file of files) {
        const fileUp = await file.file;
        const img = await this.imageService.uploadImage(fileUp);
        const image = await this.imageService.createImage(img);
        imgs.push(image.id);
      }
      const newProduct: CreateProductDto = {
        ...createProductDto,
        images: imgs,
      };
      return await this.productService.createProduct(newProduct);
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
