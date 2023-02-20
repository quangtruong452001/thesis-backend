import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../decorator';

@Resolver('Category')
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  @Query('categories')
  async categories() {
    // console.log(user);
    const categories: any = await this.categoryService.categories();
    const results: any = [];
    let category: any;
    for (let i = 0; i < categories.length; i++) {
      category = { ...categories[i]._doc };
      category.totalProducts = await this.productService.count({
        categories: category._id,
      });
      results.push({ ...category });
    }
    return results;
  }

  @Mutation('updateCategory')
  async updateCategory(@Args('id') id: string, @Args('name') name: string) {
    try {
      const category = await this.categoryService.updateCategory(id, name);
      if (category) {
        return {
          success: true,
          msg: 'Update category successfully',
          data: category,
        };
      } else {
        return {
          success: false,
          msg: 'Update category failed',
        };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Mutation('deleteCategory')
  async deleteCategory(@Args('id') id: string) {
    try {
      const deletedCategory = await this.categoryService.deleteCategory(id);
      if (deletedCategory) {
        return {
          success: true,
          msg: 'Delete category successfully',
          data: deletedCategory,
        };
      } else {
        return {
          success: false,
          msg: 'Delete category failed',
        };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Mutation('addCategory')
  async addCategory(@Args('name') name: string) {
    try {
      const newCategory = await this.categoryService.addCategory(name);
      return {
        success: true,
        msg: 'Add category successfully',
        data: newCategory,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
