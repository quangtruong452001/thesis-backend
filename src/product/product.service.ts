import {
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Model, PaginateModel } from 'mongoose';
import { Product, ProductDocument } from '../model/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

// import { ConfigService } from '@nestjs/config';

// import { ProductDto } from './dto/product.dto';

import { Request } from 'express';
import { productQuery, productSort } from '../utils/type';
import {
  getDefaultPagingOptions,
  handleProductFilters,
  handleProductSorts,
} from '../utils/helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>, // private config: ConfigService,
    @InjectModel(Product.name)
    private productModelPagination: PaginateModel<ProductDocument>,
  ) {}

  // Return list of products base on options
  async products(options: any, page?: number, limit?: number, sorts?: any) {
    try {
      const query = options;
      // const products = await this.productModel.paginate(
      //   query,
      //   getDefaultPagingOptions(page, limit, sort),
      // );
      // const products = await this.productModel
      //   .find(options)
      //   .skip((page - 1) * limit)
      //   .limit(limit)
      //   .sort(sort)
      //   .populate(['images', 'categories']);

      const data = await this.productModelPagination.paginate(query, {
        page: page,
        limit: limit,
        populate: ['images', 'categories'],
        sort: sorts,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Return Product details
  async productDetail(id: string) {
    try {
      const product = await this.productModel
        .findById(id)
        .populate(['images', 'categories']);
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Count number of product base on options
  async count(options: any) {
    try {
      return this.productModel.count(options);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get number of total products
  async getTotalProducts() {
    try {
      const totalProducts = await this.productModel.countDocuments({});

      return totalProducts;
      // return {
      //   totalProducts,
      //   statusCode: 200,
      // };
    } catch (err) {
      throw err;
    }
  }

  // Find min, max price
  async getMinPrice() {
    try {
      const products = await this.productModel.find({}).sort({ price: 'asc' });
      return products[0].price;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getMaxPrice() {
    try {
      const products = await this.productModel.find({}).sort({ price: 'desc' });
      return products[0].price;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Delete product
  async deleteProduct(id: string) {
    try {
      const product = await this.productModel.findByIdAndRemove(id);
      return product;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // TODO: Add create and update

  async createProduct(input: CreateProductDto) {
    try {
      const data = await this.productModel.create(input);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProduct(id: string, input: UpdateProductDto) {
    try {
      const data = await this.productModel.findByIdAndUpdate(id, input);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async similarProducts(options) {
    try {
      const similarProducts = await this.products(options, 1, 4);
      return similarProducts;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async objectIdArray() {
    try {
      const objectIdArray: any = [];
      const data = await this.productModel.find({});
      for (let i = 0; i < data.length; i++) {
        objectIdArray.push(data[i]._id);
      }
      return objectIdArray;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
