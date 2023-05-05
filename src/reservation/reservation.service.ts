import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from '../model/reservation.schema';
import {
  ReservationInput,
  UpdateReservationInput,
} from '../dto/reservation.dto';
import { Hour, HourDocument } from 'src/model/hour.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,

    @InjectModel(Hour.name)
    private hourModel: Model<HourDocument>,
  ) {}

  async findAll() {
    try {
      return await this.reservationModel
        .find()
        .populate(['userId', 'reservationHour', 'serviceType'])
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Could not fetch reservations: ${error.message}`);
    }
  }

  async userReservations(userId: string) {
    try {
      return await this.reservationModel
        .find({ userId: userId })
        .populate(['userId', 'reservationHour', 'serviceType'])
        .sort({ reservationDate: -1 });
    } catch (error) {
      throw new Error(`Could not fetch user reservations: ${error.message}`);
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
  async getHours() {
    try {
      return await this.hourModel.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // async getRecommend(userId: string) {
  //   try {
  //     return '639d74634fcc337e576abc49';
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
  async getRecommend(userId: string) {
    try {
      const reservations = await this.reservationModel.find();
      const targetUserReservations = reservations.filter(
        (reservation) => reservation.userId === userId,
      );

      //Calculate the Jaccard similarity
      const similarities = reservations.reduce<{ [userId: string]: number }>(
        (acc, reservation) => {
          if (reservation.userId !== userId) {
            const intersection = targetUserReservations.filter(
              (r) => reservation.serviceType === r.serviceType,
            );
            const union = [...targetUserReservations, reservation];
            const similarity = intersection.length / union.length;
            acc[reservation.userId] = similarity;
          }
          return acc;
        },
        {},
      );
      console.log("similarities: ", similarities);
      // Sort other users by decreasing similarity and select the top k
      const k = 5;
      const similarUsers = Object.keys(similarities)
        .sort((a, b) => similarities[b] - similarities[a])
        .slice(0, k);
      console.log("similarUsers",similarUsers);
      // For each service type not used by the target user, calculate a weighted sum of the service types used by the top k similar users
      const usedServiceTypes = new Set(
        targetUserReservations.map((reservation) => reservation.serviceType),
      );
      const serviceTypeScores = reservations.reduce<{
        [serviceType: string]: number;
      }>((acc, reservation) => {
        if (!usedServiceTypes.has(reservation.serviceType)) {
          const similaritySum = similarUsers.reduce((sum, userId) => {
            const similarity = similarities[userId];
            const userReservations = reservations.filter(
              (r) => r.userId === userId,
            );
            const serviceTypeCount = userReservations.filter(
              (r) => r.serviceType === reservation.serviceType,
            ).length;
            return sum + similarity * serviceTypeCount;
          }, 0);
          acc[reservation.serviceType] = similaritySum;
        }
        return acc;
      }, {});

      // Recommend the service type with the highest weighted sum
      return Object.keys(serviceTypeScores).reduce((a, b) =>
        serviceTypeScores[a] > serviceTypeScores[b] ? a : b,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
