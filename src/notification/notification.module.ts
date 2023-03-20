import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../model/order.schema';
// import { User, UserSchema } from "../model/user.schema";
import { Notification, NotificationSchema } from '../model/notification.schema';
// import { OrderService } from "../order/order.service";
// import { OrderResolver } from "../order/order.resolver";
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { Reservation, ReservationSchema } from 'src/model/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [NotificationService, NotificationResolver],
})
export class NotificationModule {}
