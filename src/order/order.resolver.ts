import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { OrderService } from './order.service';
import {
  CreateOrderInput,
  OrderFilter,
  UpdateOrderInput,
} from '../dto/order.dto';
import { handleOrderFilters } from '../utils/helper';
import { GetUser } from '../decorator';
import { PubSub } from 'graphql-subscriptions';
import { NotificationService } from '../notification/notification.service';
import { NotificationDto, notificationType } from '../dto/notification.dto';
import { createPaymentInput } from '../dto/payment.dto';
import { MongoIdPipe } from 'src/dto/pipe';

@Resolver('Order')
export class OrderResolver {
  private pubSub: PubSub;
  constructor(
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
  ) {
    this.pubSub = new PubSub();
  }

  // @Query('orders')
  // async orders(
  //   @Args('page') page: number,
  //   @Args('limit') limit: number,
  //   @Args('sort') sort: any,
  //   @Args('filters', { nullable: true }) filters: OrderFilter,
  // ) {
  //   const options = handleOrderFilters(filters);
  //   return this.orderService.orders(filters, page, limit, sort);
  // }

  @Query('order')
  async order(@Args('id', MongoIdPipe) id: string) {
    return this.orderService.getOrderById(id);
  }
  @Query('totalOrderandSales')
  async totalOrdersAndSales() {
    return this.orderService.getTotal();
  }
  @Query('latestOrders')
  async getLatestOrders() {
    return this.orderService.getLatestOrder();
  }
  @Mutation('createOrder')
  async createOrder(@Args('input') input: CreateOrderInput, @GetUser() user) {
    try {
      input.user = user.id;
      const data = await this.orderService.createOrder(input);
      if (data) {
        const notificationDto: NotificationDto = {
          title: 'You have new order',
          type: notificationType.ORDER,
          orderId: data._id ? data._id : data.id,
        };
        const notification = await this.notificationService.create(
          notificationDto,
        );
        // console.log(notification);
        await this.pubSub.publish('newOrderNotification', {
          newOrderNotification: notification,
        });
        return {
          success: true,
          msg: 'Create order successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          msg: 'Create order failed',
        };
      }
    } catch (error) {
      console.error(`Error in createOrder mutation: ${error}`);
      throw new Error(`Could not create order ${error}`);
    }
  }
  @Mutation('createPayment')
  async createPayment(
    @Args('input') input: createPaymentInput,
    @GetUser() user,
  ) {
    try {
      input.user = user.id;
      const data = await this.orderService.createPayment(input);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Mutation('updateOrder')
  async updateOrder(
    @Args('id', MongoIdPipe) id: string,
    @Args('input') input: UpdateOrderInput,
  ) {
    try {
      const data = await this.orderService.updateOrder(id, input);
      if (data) {
        return {
          success: true,
          msg: 'Update order successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          msg: 'Update order failed',
        };
      }
    } catch (error) {
      console.error(`Error in updateOrder mutation: ${error}`);
      throw new Error('Could not update order');
    }
  }

  @Mutation('deleteOrder')
  async deleteOrder(@Args('id', MongoIdPipe) id: string) {
    try {
      const data = await this.orderService.deleteOrder(id);
      if (data) {
        return {
          success: true,
          msg: 'Delete order successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          msg: 'Delete order failed',
        };
      }
    } catch (error) {
      console.error(`Error in deleteOrder mutation: ${error}`);
      throw new Error('Could not delete order');
    }
  }

  @Subscription(
    'newOrderNotification',
    //   , {
    //   filter: (payload, variables) =>
    //     payload.commentAdded.title === variables.title,
    // }
  )
  newOrderNotification() {
    // console.log(this.pubSub.asyncIterator('newNotification'));
    return this.pubSub.asyncIterator('newOrderNotification');
  }
}
