import {
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument, Order } from '../model/order.schema';
import { CreateOrderInput, UpdateOrderInput } from '../dto/order.dto';
import { PaymentDocument, Payment } from '../model/payment.schema';
import { createPaymentInput } from '../dto/payment.dto';
import { ObjectId } from 'mongodb';
interface Itemset {
  items: string[];
  support?: number;
}
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>, // @InjectModel(Order.name) // private PaginationOrderModel: PaginateModel<OrderDocument>,
  ) {}
  // async orders(options: any, page: number, limit: number, sorts: string) {
  //   try {
  //     const query = options;
  //     const data = await this.PaginationOrderModel.paginate(query, {
  //       page: page,
  //       limit: limit,
  //       populate: ['user'],
  //       sort: sorts,
  //     });
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
  // Get a single order by id
  async getOrderById(id: string): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id).populate('user');
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
      const data = await newOrder.populate('user');
      return newOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update an existing order
  async updateOrder(id: string, updateOrderInput: UpdateOrderInput) {
    try {
      const updatedOrder = await this.orderModel
        .findByIdAndUpdate(id, updateOrderInput, { new: true })
        .populate('user');
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
      return await this.orderModel.find({ status: 'PENDING' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // async userRecommendation(user: string) {
  //   try {
  //     const orders = await this.orderModel.find();
  //     const users = Array.from(new Set(orders.map((order) => order.user)));
  //     const products = Array.from(
  //       new Set(
  //         orders.flatMap((order) => order.cart.map((product) => product.id)),
  //       ),
  //     );
  //     const userItemMatrix: number[][] = [];
  //     for (const user of users) {
  //       const userRow = new Array(products.length).fill(0);
  //       for (const order of orders.filter((order) => order.user === user)) {
  //         for (const product of order.cart) {
  //           const productIndex = products.indexOf(product.id);
  //           userRow[productIndex] += 1;
  //         }
  //       }
  //       userItemMatrix.push(userRow);
  //     }

  //     // compute similarities
  //     const similarities: number[][] = [];
  //     for (let i = 0; i < users.length; i++) {
  //       const similarityRow = new Array(users.length).fill(0);
  //       for (let j = 0; j < users.length; j++) {
  //         const user1 = userItemMatrix[i];
  //         const user2 = userItemMatrix[j];
  //         const similarity = cosineSimilarity(user1, user2);
  //         similarityRow[j] = similarity;
  //       }
  //       similarities.push(similarityRow);
  //     }

  //     function cosineSimilarity(u: number[], v: number[]): number {
  //       const dotProduct = u.reduce((sum, _, i) => sum + u[i] * v[i], 0);
  //       const uMagnitude = Math.sqrt(u.reduce((sum, x) => sum + x * x, 0));
  //       const vMagnitude = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
  //       return dotProduct / (uMagnitude * vMagnitude);
  //     }
  //     console.log(users, user);
  //     const userIndex = users.indexOf(user);
  //     if (userIndex === -1) {
  //       // user not found in orders, return empty list of recommendations
  //       return [];
  //     }
  //     const similarUsers: string[] = [];
  //     for (let i = 0; i < users.length; i++) {
  //       if (i !== userIndex && similarities[userIndex][i] > 0) {
  //         similarUsers.push(users[i]);
  //       }
  //     }
  //     console.log(userIndex, similarUsers);
  //     const recommendedProducts = new Set<string>();
  //     for (const similarUser of similarUsers) {
  //       const similarUserIndex = users.indexOf(similarUser);
  //       const similarUserRow = userItemMatrix[similarUserIndex];
  //       for (let i = 0; i < similarUserRow.length; i++) {
  //         if (similarUserRow[i] > 0 && userItemMatrix[userIndex][i] === 0) {
  //           recommendedProducts.add(products[i]);
  //           if (recommendedProducts.size === 6) {
  //             // stop adding more recommended products
  //             break;
  //           }
  //         }
  //       }
  //       if (recommendedProducts.size === 6) {
  //         // stop iterating over similar users if we already have 6 recommendations
  //         break;
  //       }
  //     }
  //     return Array.from(recommendedProducts);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
  async userRecommendation(user: string) {
    try {
      const orders = await this.orderModel.find();
      const users = Array.from(new Set(orders.map((order) => order.user)));

      // const products = Array.from(
      //   new Set(
      //     orders.flatMap((order) => order.cart.map((product) => product.id)),
      //   ),
      // );

      const userItemMatrix: Map<string, Map<string, number>> = new Map();

      for (const user of users) {
        userItemMatrix.set(String(user), new Map());
      }

      for (const order of orders) {
        const currentUserItems = userItemMatrix.get(String(order.user));

        for (const product of order.cart) {
          const productId = product.id;

          if (!currentUserItems.has(productId)) {
            currentUserItems.set(productId, 0);
          }

          currentUserItems.set(productId, currentUserItems.get(productId) + 1);
        }
        // console.log('after', currentUserItems);
      }

      const targetUserItems = userItemMatrix.get(user);
      if (!targetUserItems) {
        return [];
      }

      const similarUsers: Map<string, number> = new Map();

      for (const [otherUser, items] of userItemMatrix.entries()) {
        if (otherUser !== user) {
          let intersectionCount = 0;

          for (const [productId] of targetUserItems) {
            if (items.has(productId)) {
              intersectionCount++;
            }
          }

          const similarity =
            intersectionCount / Math.sqrt(targetUserItems.size * items.size);

          if (similarity > 0) {
            similarUsers.set(otherUser, similarity);
          }
        }
      }

      const sortedSimilarUsers = Array.from(similarUsers.entries()).sort(
        (a, b) => b[1] - a[1],
      );
      console.log(sortedSimilarUsers);
      console.log('target item', targetUserItems);
      const recommendedProducts: Set<string> = new Set();
      for (const [otherUser, similarity] of sortedSimilarUsers) {
        const otherUserItems = userItemMatrix.get(otherUser);

        for (const [productId] of otherUserItems) {
          if (!targetUserItems.has(productId)) {
            recommendedProducts.add(productId);
          }
        }
      }

      // Convert recommendedProducts Set to an array
      let recommendations = Array.from(recommendedProducts);
      if (recommendations.length > 6) {
        // If more than 6 recommendations, choose random 6
        const randomRecommendations: string[] = [];
        while (randomRecommendations.length < 6) {
          const randomIndex = Math.floor(
            Math.random() * recommendations.length,
          );
          const randomProduct = recommendations[randomIndex];
          if (!randomRecommendations.includes(randomProduct)) {
            randomRecommendations.push(randomProduct);
          }
        }

        recommendations = randomRecommendations;
      }
      console.log(recommendations);
      return recommendations;
    } catch (error) {
      // Handle any errors
      console.error(error);
      return [];
    }
  }

  async createPayment(createPaymentInput: createPaymentInput) {
    try {
      const newPayment = await this.paymentModel.create(createPaymentInput);
      await newPayment.save();
      return newPayment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
