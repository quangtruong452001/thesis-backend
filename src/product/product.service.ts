import {
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Model, PaginateModel } from 'mongoose';
import { Product, ProductDocument } from '../model/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { OrderService } from 'src/order/order.service';
// import { ConfigService } from '@nestjs/config';

// import { ProductDto } from './dto/product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>, // private config: ConfigService,
    @InjectModel(Product.name)
    private productModelPagination: PaginateModel<ProductDocument>, //private orderService: OrderService,
    private orderService: OrderService,
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
      sorts.createdAt = -1;
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
  async getAllProduct(filters: any) {
    try {
      const query = filters;
      return this.productModelPagination.paginate(query, {
        populate: ['images', 'categories'],
      });
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

  // Create products

  async createProduct(productDto: CreateProductDto) {
    // console.log(productDto);
    try {
      const newProduct = await this.productModel.create(productDto);
      // console.log(newProduct);
      await newProduct.save();
      if (newProduct.images) {
        return await newProduct.populate(['images', 'categories']);
      } else {
        return await newProduct.populate('categories');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //Update product
  async updateProduct(id: string, productDto: UpdateProductDto) {
    try {
      const upProduct = await this.productModel.findByIdAndUpdate(
        id,
        productDto,
        {
          new: true,
        },
      );
      if (upProduct.images) {
        return await upProduct.populate(['images', 'categories']);
      } else {
        return await upProduct.populate('categories');
      }
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

  async getRecommend(userId: string) {
    try {
      const list = await this.orderService.userRecommendation(userId);
      const listProducts = await this.productModel
        .find({
          name: { $in: list },
        })
        .populate(['images', 'categories']);
      const numRandomProducts = 6 - listProducts.length;

      const randomProducts = await this.productModel.aggregate([
        { $match: { _id: { $nin: listProducts.map((p) => p._id) } } },
        { $sample: { size: numRandomProducts < 0 ? 0 : numRandomProducts } },
        {
          $lookup: {
            from: 'images', // name of the collection to join
            localField: 'images', // name of the field in the product collection
            foreignField: '_id', // name of the field in the images collection
            as: 'images', // name of the field to add in the product document
          },
        },
        {
          $lookup: {
            from: 'categories', // name of the collection to join
            localField: 'categories', // name of the field in the product collection
            foreignField: '_id', // name of the field in the categories collection
            as: 'categories', // name of the field to add in the product document
          },
        },
      ]);
      const recommendedProducts = [...listProducts, ...randomProducts];
      return recommendedProducts;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
