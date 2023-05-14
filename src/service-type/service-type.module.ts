import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceType, ServiceTypeSchema } from '../model/serviceType.schema';
import { serviceTypeService } from './serviceType.service';
import { ServiceTypeResolver } from './serviceType.resolver';
import { ReservationService } from '../reservation/reservation.service';
// import { Hour, Reservation } from '../graphql';
import { ReservationSchema, Reservation } from '../model/reservation.schema';
import { HourSchema, Hour } from '../model/hour.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceType.name, schema: ServiceTypeSchema },
      { name: Reservation.name, schema: ReservationSchema },
      { name: Hour.name, schema: HourSchema },
    ]),
  ],
  providers: [serviceTypeService, ServiceTypeResolver, ReservationService],
})
export class ServiceTypeModule {}
