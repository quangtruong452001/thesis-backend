import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from '../model/reservation.schema';
import {
  ReservationInput,
  UpdateReservationInput,
} from '../dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async findAll() {
    try {
      return await this.reservationModel.find().populate([
        'userId',
        'species',
        // , 'hour'
        'serviceType',
      ]);
    } catch (error) {
      throw new Error(`Could not fetch reservations: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.reservationModel.findById(id).populate([
        'userId',
        'species',
        // 'hour',
        'serviceType',
      ]);
    } catch (error) {
      throw new Error(
        `Could not fetch reservation with id ${id}: ${error.message}`,
      );
    }
  }

  async create(createReservationDto: ReservationInput) {
    try {
      const createdReservation = new this.reservationModel(
        createReservationDto,
      );
      return await createdReservation.save();
    } catch (error) {
      throw new Error(`Could not create reservation: ${error.message}`);
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationInput) {
    try {
      return await this.reservationModel.findByIdAndUpdate(
        id,
        updateReservationDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new Error(
        `Could not update reservation with id ${id}: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.reservationModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(
        `Could not delete reservation with id ${id}: ${error.message}`,
      );
    }
  }
}
