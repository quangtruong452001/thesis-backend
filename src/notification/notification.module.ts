import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../model/order.schema';
// import { User, UserSchema } from "../model/user.schema";
import { Notification, NotificationSchema } from '../model/notification.schema';
// import { OrderService } from "../order/order.service";
// import { OrderResolver } from "../order/order.resolver";
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationService, NotificationResolver],
})
export class NotificationModule {}
