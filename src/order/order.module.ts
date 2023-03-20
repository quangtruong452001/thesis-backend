import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../model/order.schema';
import { User, UserSchema } from '../model/user.schema';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { NotificationService } from '../notification/notification.service';
import { Notification, NotificationSchema } from '../model/notification.schema';
import { Payment, PaymentSchema } from 'src/model/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  providers: [OrderService, OrderResolver, NotificationService],
})
export class OrderModule {}
