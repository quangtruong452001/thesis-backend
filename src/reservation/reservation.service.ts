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
      return await this.reservationModel
        .find()
        .populate(['userId', 'reservationHour', 'serviceType']);
    } catch (error) {
      throw new Error(`Could not fetch reservations: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.reservationModel
        .findById(id)
        .populate(['userId', 'reservationHour', 'serviceType']);
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
      await createdReservation.save();
      const data = await this.reservationModel
        .findById(createdReservation._id)
        .populate('userId');
      return data;
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
  async getSales() {
    try {
      const pipeline = [
        { $match: { status: 'SUCCESS' } },
        {
          $lookup: {
            from: 'servicetypes',
            localField: 'serviceType',
            foreignField: '_id',
            as: 'service',
          },
        },
        {
          $unwind: '$service',
        },
        {
          $unwind: '$service.price',
        },
        {
          $addFields: {
            totalPrice: {
              $cond: {
                if: {
                  $and: [
                    { $gte: ['$weight', '$service.price.minWeight'] },
                    { $lt: ['$weight', '$service.price.maxWeight'] },
                  ],
                },
                then: '$service.price.priceNumber',
                else: 0,
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$totalPrice' },
          },
        },
        {
          $project: {
            _id: 0,
            totalSales: 1,
          },
        },
      ];
      const sales = await this.reservationModel.aggregate(pipeline).exec();
      return {
        totalSales: sales.length > 0 ? sales[0].totalSales : 0,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTodayReservation() {
    try {
      return await this.reservationModel
        .find({
          reservationDate: {
            $gte: new Date(new Date().setHours(0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59)),
          },
        })
        .populate('userId')
        .populate('reservationHour')
        .populate('serviceType');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
