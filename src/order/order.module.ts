import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../model/order.schema';
import { User, UserSchema } from '../model/user.schema';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
