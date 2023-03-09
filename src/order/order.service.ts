import {
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument, Order } from '../model/order.schema';
import { CreateOrderInput, UpdateOrderInput } from '../dto/order.dto';
interface Itemset {
  items: string[];
  support?: number;
}
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
  // get Total
  async getTotal() {
    try {
      const totalOrder = await this.orderModel.countDocuments();
      const totalPendingOrder = await this.orderModel.countDocuments({
        status: 'PENDING',
      });
      const totalFinishedOrder = await this.orderModel.countDocuments({
        status: 'FINISHED',
      });
      const totalSales = await this.orderModel.aggregate([
        { $match: { status: 'FINISHED' } },
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: { $subtract: ['$totalPrice', '$shippingFee'] },
            },
          },
        },
        {
          $project: {
            totalSales: { $round: ['$totalSales', 2] },
          },
        },
      ]);

      return {
        totalOrder: totalOrder,
        totalPendingOrder: totalPendingOrder,
        totalFinishedOrder: totalFinishedOrder,
        totalSales: totalSales[0].totalSales,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getLatestOrder() {
    try {
      return await this.orderModel.find().sort({ createdAt: -1 }).limit(5);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async userRecommendation(userId: string) {
    try {
      const orders = await this.orderModel.find();
      const userOrders = orders.filter((order) => order.user === userId);
      const itemSets = userOrders.flatMap((order) =>
        order.cart.map((product) => product.name),
      );

      //Apriori

      // Generate frequent itemsets using the Apriori algorithm
      const frequentItemsets: Itemset[] = [];
      let candidates: Itemset[] = [{ items: itemSets }];
      let k = 1;
      const minSupport = Math.ceil(0.4 * userOrders.length);

      while (candidates.length > 0) {
        // Count the support of each candidate itemset
        const supportCounts = new Map<string, number>();
        for (const order of userOrders) {
          for (const candidate of candidates) {
            if (
              candidate.items.every((item) =>
                order.cart.map((p) => p.name).includes(item),
              )
            ) {
              const key = candidate.items.join(',');
              supportCounts.set(key, (supportCounts.get(key) ?? 0) + 1);
            }
          }
        }

        // Prune candidate itemsets that don't meet the minimum support
        candidates = candidates.filter((candidate) => {
          const key = candidate.items.join(',');
          const support = supportCounts.get(key) ?? 0;
          candidate.support = support;
          if (support < minSupport) {
            return false;
          }
          frequentItemsets.push(candidate);
          return true;
        });

        // Generate new candidate itemsets
        const newCandidates: Itemset[] = [];
        for (let i = 0; i < candidates.length; i++) {
          const itemset1 = candidates[i];
          for (let j = i + 1; j < candidates.length; j++) {
            const itemset2 = candidates[j];
            if (
              itemset1.items.slice(0, k - 1).join() ===
              itemset2.items.slice(0, k - 1).join()
            ) {
              const newItemset = {
                items: [...new Set([...itemset1.items, ...itemset2.items])],
              };
              newCandidates.push(newItemset);
            }
          }
        }

        candidates = newCandidates;
        k++;
      }
      const recommendedProducts = frequentItemsets
        .flatMap((itemSet) => itemSet.items)
        .filter((product, idx, arr) => {
          return !itemSets.includes(product) && arr.indexOf(product) === idx;
        })
        .map((product) => parseInt(product));

      return recommendedProducts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
