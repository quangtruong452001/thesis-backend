import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceType, ServiceTypeSchema } from '../model/serviceType.schema';
import { serviceTypeService } from './serviceType.service';
import { ServiceTypeResolver } from './serviceType.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceType.name, schema: ServiceTypeSchema },
    ]),
  ],
  providers: [serviceTypeService, ServiceTypeResolver],
})
export class ServiceTypeModule {}
