import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../model/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async categories() {
    const categories = await this.categoryModel.find({});
    return categories;
  }

  async updateCategory(id: string, name: string) {
    return this.categoryModel.findByIdAndUpdate(
      id,
      { category_name: name },
      { new: true },
    );
  }

  async addCategory(name: string) {
    return this.categoryModel.create({ category_name: name });
  }

  async deleteCategory(id: string) {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
