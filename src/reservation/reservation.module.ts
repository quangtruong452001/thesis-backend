/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from '../model/reservation.schema';
import { User, UserSchema } from '../model/user.schema';
import { Category, CategorySchema } from '../model/category.schema';
import { Hour, HourSchema } from '../model/hour.schema';
import { ServiceType, ServiceTypeSchema } from '../model/serviceType.schema';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Hour.name, schema: HourSchema },
      { name: ServiceType.name, schema: ServiceTypeSchema },
    ]),
  ],
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
