import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from '../model/reservation.schema';
import { User, UserSchema } from '../model/user.schema';
import { ReservationService } from '../reservation/reservation.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Hour, HourSchema } from '../model/hour.schema';
import { Image, ImageSchema } from '../model/image.schema';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: User.name, schema: UserSchema },
      // { name: Category.name, schema: CategorySchema },
      { name: Hour.name, schema: HourSchema },
      { name: Image.name, schema: ImageSchema },
      // { name: ServiceType.name, schema: ServiceTypeSchema },
      // { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [ReservationService, ImageService, UserService, UserResolver],
})
export class UserModule {}
