import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
      return await this.NotificationModel.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: 'orderId',
            foreignField: '_id',
            as: 'order',
          },
        },
        {
          $lookup: {
            from: 'reservations',
            localField: 'reservationId',
            foreignField: '_id',
            as: 'reservation',
          },
        },
        {
          $match: {
            $or: [{ order: { $ne: [] } }, { reservation: { $ne: [] } }],
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      // TODO: update populate later
    } catch (error) {
      throw new Error(`Could not fetch Notifications: ${error.message}`);
    }
  }
  async countIsRead() {
    try {
      const notifications = await this.findAll();
      const count = notifications.filter(
        (notification) => !notification.isRead,
      ).length;
      return count;
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
      const updatedNotification =
        await this.NotificationModel.findByIdAndUpdate(
          id,
          { isRead: true },
          { new: true }, // <-- Return the modified document instead of the original
        ).populate('orderId');

      return id;
      return await this.NotificationModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'orders',
            localField: 'orderId',
            foreignField: '_id',
            as: 'order',
          },
        },
        {
          $lookup: {
            from: 'reservations',
            localField: 'orderId',
            foreignField: '_id',
            as: 'reservation',
          },
        },
        {
          $match: {
            $or: [{ order: { $ne: [] } }, { reservation: { $ne: [] } }],
          },
        },
      ]);
    } catch (error) {
      throw new Error(
        `Could not update notification with id ${id}: ${error.message}`,
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
