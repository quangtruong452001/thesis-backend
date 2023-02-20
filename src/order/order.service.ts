import {
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument, Order } from '../model/order.schema';
import { CreateOrderInput, UpdateOrderInput } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(Order.name)
    private PaginationOrderModel: PaginateModel<OrderDocument>,
  ) {}
  async orders(options: any, page: number, limit: number, sorts: string) {
    try {
      const query = options;
      const data = await this.PaginationOrderModel.paginate(query, {
        page: page,
        limit: limit,
        populate: ['user'],
        sort: sorts,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // Get a single order by id
  async getOrderById(id: string): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id);
      return order;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Create a new order
  async createOrder(createOrderInput: CreateOrderInput) {
    try {
      const newOrder = await this.orderModel.create(createOrderInput);
      await newOrder.save();
      return newOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update an existing order
  async updateOrder(id: string, updateOrderInput: UpdateOrderInput) {
    try {
      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        id,
        updateOrderInput,
        { new: true },
      );
      return updatedOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete an existing order
  async deleteOrder(id: string) {
    try {
      const order = await this.orderModel.findByIdAndDelete(id);
      return order;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
