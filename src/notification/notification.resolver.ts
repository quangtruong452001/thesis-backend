// create resolvers for notification
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver('Notification')
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [Notification])
  async notifications() {
    return this.notificationService.findAll();
  }
  @Query('countIsRead')
  async countIsRead() {
    return this.notificationService.countIsRead();
  }
  @Mutation('markNotificationAsRead')
  async markNotificationAsRead(@Args('id') id: string) {
    return this.notificationService.markNotificationAsRead(id);
  }
  // @Mutation(() => Notification)
  // async createNotification(
  //   @Args('createNotificationInput')
  //   createNotificationInput: CreateNotificationInput,
  // ) {
  //   return this.notificationService.create(createNotificationInput);
  // }

  // @Mutation(() => Notification)
  // async updateNotification(
  //   @Args('updateNotificationInput')
  //   updateNotificationInput: UpdateNotificationInput,
  // ) {
  //   return this.notificationService.update(updateNotificationInput);
  // }

  // @Mutation(() => Notification)
  // async deleteNotification(@Args('id') id: string) {
  //   return this.notificationService.delete(id);
  // }
}
