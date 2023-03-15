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
      return await this.orderModel.find().sort({ createdAt: -1 }).limit(5);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async userRecommendation(user: string) {
    try {
      const orders = await this.orderModel.find();
      const userOrders = orders.filter((order) => order.user === user);
      // const userOrders = orders;
      // const itemSets = userOrders.flatMap((order) =>
      //   order.cart.map((product) => product.name),
      // );
      // //console.log('orders', itemSets);
      // //Apriori

      // // Generate frequent itemsets using the Apriori algorithm
      // const frequentItemsets: Itemset[] = [];
      // let candidates: Itemset[] = [{ items: itemSets }];
      // let k = 1;
      // const minSupport = Math.ceil(0.4 * userOrders.length);
      // console.log('candi', candidates);
      // while (candidates.length > 0) {
      //   // Count the support of each candidate itemset
      //   const supportCounts = new Map<string, number>();
      //   for (const order of userOrders) {
      //     for (const candidate of candidates) {
      //       console.log(
      //         'acd',
      //         candidate.items,
      //         order.cart.map((p) => p.name),
      //       );
      //       if (
      //         candidate.items.every((item) =>
      //           order.cart.map((p) => p.name).includes(item),
      //         )
      //       ) {
      //         const key = candidate.items.join(',');
      //         supportCounts.set(key, (supportCounts.get(key) ?? 0) + 1);
      //       }
      //     }
      //   }
      //   console.log(supportCounts);
      //   // Prune candidate itemsets that don't meet the minimum support
      //   candidates = candidates.filter((candidate) => {
      //     const key = candidate.items.join(',');
      //     const support = supportCounts.get(key) ?? 0;
      //     candidate.support = support;
      //     //console.log('abc', candidate);
      //     if (support < minSupport) {
      //       return false;
      //     }
      //     frequentItemsets.push(candidate);
      //     return true;
      //   });

      //   // Generate new candidate itemsets
      //   const newCandidates: Itemset[] = [];
      //   for (let i = 0; i < candidates.length; i++) {
      //     const itemset1 = candidates[i];
      //     for (let j = i + 1; j < candidates.length; j++) {
      //       const itemset2 = candidates[j];
      //       if (
      //         itemset1.items.slice(0, k - 1).join() ===
      //         itemset2.items.slice(0, k - 1).join()
      //       ) {
      //         const newItemset = {
      //           items: [...new Set([...itemset1.items, ...itemset2.items])],
      //         };
      //         newCandidates.push(newItemset);
      //       }
      //     }
      //   }

      //   candidates = newCandidates;

      //   k++;
      // }
      // const recommendedProducts = frequentItemsets
      //   .flatMap((itemSet) => itemSet.items)
      //   .filter((product, idx, arr) => {
      //     return !itemSets.includes(product) && arr.indexOf(product) === idx;
      //   })
      //   .map((product) => parseInt(product));
      // return recommendedProducts;
      // const allProducts = new Set();
      // for (const order of orders) {
      //   for (const product of order.cart) {
      //     allProducts.add(product.name);
      //   }
      // }

      // // Step 2: Calculate the frequency of each product that has been ordered by all users.
      // const productFrequency = new Map();
      // for (const order of orders) {
      //   for (const product of order.cart) {
      //     const count = productFrequency.get(product.name) || 0;
      //     productFrequency.set(product.name, count + 1);
      //   }
      // }
      // console.log('freq', productFrequency);
      // // Step 3: Sort the products based on their frequency in descending order.
      // const sortedProducts = Array.from(allProducts).sort(
      //   (a, b) => productFrequency.get(b) - productFrequency.get(a),
      // );
      // console.log('sorted', sortedProducts);
      // // Step 4: Find the top 3 products that have the highest association with each product that has been ordered by the specific user.
      // const userProducts = new Set();
      // for (const order of userOrders) {
      //   for (const product of order.cart) {
      //     userProducts.add(product.name);
      //   }
      // }

      // const recommendedProducts = new Set();
      // for (const userProduct of userProducts) {
      //   for (const sortedProduct of sortedProducts) {
      //     if (
      //       userProduct !== sortedProduct &&
      //       !recommendedProducts.has(sortedProduct)
      //     ) {
      //       recommendedProducts.add(sortedProduct);
      //       if (recommendedProducts.size >= 3) {
      //         break;
      //       }
      //     }
      //   }
      // }

      // // Step 5: Return the top 3 products as recommendations for the specific user.
      // return Array.from(recommendedProducts).slice(0, 3);
      // create user-item matrix
      const users = Array.from(new Set(orders.map((order) => order.user)));
      const products = Array.from(
        new Set(
          orders.flatMap((order) => order.cart.map((product) => product.id)),
        ),
      );
      const userItemMatrix: number[][] = [];
      for (const user of users) {
        const userRow = new Array(products.length).fill(0);
        for (const order of orders.filter((order) => order.user === user)) {
          for (const product of order.cart) {
            const productIndex = products.indexOf(product.id);
            userRow[productIndex] += 1;
          }
        }
        userItemMatrix.push(userRow);
      }

      // compute similarities
      const similarities: number[][] = [];
      for (let i = 0; i < users.length; i++) {
        const similarityRow = new Array(users.length).fill(0);
        for (let j = 0; j < users.length; j++) {
          const user1 = userItemMatrix[i];
          const user2 = userItemMatrix[j];
          const similarity = cosineSimilarity(user1, user2);
          similarityRow[j] = similarity;
        }
        similarities.push(similarityRow);
      }

      function cosineSimilarity(u: number[], v: number[]): number {
        const dotProduct = u.reduce((sum, _, i) => sum + u[i] * v[i], 0);
        const uMagnitude = Math.sqrt(u.reduce((sum, x) => sum + x * x, 0));
        const vMagnitude = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
        return dotProduct / (uMagnitude * vMagnitude);
      }
      console.log(users, user);
      const userIndex = users.indexOf(user);
      if (userIndex === -1) {
        // user not found in orders, return empty list of recommendations
        return [];
      }
      const similarUsers: string[] = [];
      for (let i = 0; i < users.length; i++) {
        if (i !== userIndex && similarities[userIndex][i] > 0) {
          similarUsers.push(users[i]);
        }
      }
      console.log(userIndex, similarUsers);
      const recommendedProducts = new Set<string>();
      for (const similarUser of similarUsers) {
        const similarUserIndex = users.indexOf(similarUser);
        const similarUserRow = userItemMatrix[similarUserIndex];
        for (let i = 0; i < similarUserRow.length; i++) {
          if (similarUserRow[i] > 0 && userItemMatrix[userIndex][i] === 0) {
            recommendedProducts.add(products[i]);
            if (recommendedProducts.size === 3) {
              // stop adding more recommended products
              break;
            }
          }
        }
        if (recommendedProducts.size === 3) {
          // stop iterating over similar users if we already have 3 recommendations
          break;
        }
      }
      return Array.from(recommendedProducts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
