import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceType, ServiceTypeDocument } from '../model/serviceType.schema';
import {
  ReservationInput,
  UpdateReservationInput,
} from '../dto/reservation.dto';

@Injectable()
export class serviceTypeService {
  constructor(
    @InjectModel(ServiceType.name)
    private serviceTypeModel: Model<ServiceTypeDocument>,
  ) {}

  async findAll() {
    try {
      const data = await this.serviceTypeModel.find();
      return data;
    } catch (e) {
      throw e;
      console.log(e);
    }
  }
}
