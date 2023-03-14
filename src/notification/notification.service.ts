import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from '../model/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private NotificationModel: Model<NotificationDocument>,
  ) {}

  async findAll() {
    try {
      return await this.NotificationModel.find().populate([
        {
          path: 'orderId',
          match: { _id: { $ne: null } },
        },
        {
          path: 'reservationId',
          match: { _id: { $ne: null } },
        },
      ]);
      // TODO: update populate later
    } catch (error) {
      throw new Error(`Could not fetch Notifications: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.NotificationModel.findById(id).populate([
        {
          path: 'orderId',
          match: { _id: { $ne: null } },
        },
        {
          path: 'reservationId',
          match: { _id: { $ne: null } },
        },
      ]);
    } catch (error) {
      throw new Error(
        `Could not fetch Notification with id ${id}: ${error.message}`,
      );
    }
  }

  async create(createNotificationDto) {
    try {
      const createdNotification = new this.NotificationModel(
        createNotificationDto,
      );
      await createdNotification.save();
      const data = await this.NotificationModel.findById(
        createdNotification._id,
      ).populate([
        {
          path: 'orderId',
          match: { _id: { $ne: null } },
        },
        {
          path: 'reservationId',
          match: { _id: { $ne: null } },
        },
      ]);
      // .populate('userId');
      return data;
    } catch (error) {
      throw new Error(`Could not create Notification: ${error.message}`);
    }
  }
  //
  // async update(id: string, updateReservationDto: UpdateReservationInput) {
  //   try {
  //     return await this.reservationModel.findByIdAndUpdate(
  //       id,
  //       updateReservationDto,
  //       {
  //         new: true,
  //       },
  //     );
  //   } catch (error) {
  //     throw new Error(
  //       `Could not update reservation with id ${id}: ${error.message}`,
  //     );
  //   }
  // }
  // Marks as read
  async markNotificationAsRead(id: string) {
    try {
      return await this.NotificationModel.findByIdAndUpdate(
        id,
        { isRead: true },
        {
          new: true,
        },
      ).populate([
        {
          path: 'orderId',
          match: { _id: { $ne: null } },
        },
        {
          path: 'reservationId',
          match: { _id: { $ne: null } },
        },
      ]);
    } catch (error) {
      throw new Error(
        `Could not update reservation with id ${id}: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.NotificationModel.findByIdAndDelete(id).populate([
        {
          path: 'orderId',
          match: { _id: { $ne: null } },
        },
        {
          path: 'reservationId',
          match: { _id: { $ne: null } },
        },
      ]);
    } catch (error) {
      throw new Error(
        `Could not delete Notification with id ${id}: ${error.message}`,
      );
    }
  }
}
