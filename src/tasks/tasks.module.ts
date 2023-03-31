import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from '../model/reservation.schema';
import { User, UserSchema } from '../model/user.schema';
import { Category, CategorySchema } from '../model/category.schema';
import { Hour, HourSchema } from '../model/hour.schema';
import { ServiceType, ServiceTypeSchema } from '../model/serviceType.schema';
import { ReservationService } from '../reservation/reservation.service';
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
  providers: [TasksService, ReservationService],
})
export class TasksModule {}
