import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
  // UserSchema
} from '../model/user.schema';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { Reservation, ReservationDocument } from '../model/reservation.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}
  //
  async allUser() {
    const users = await this.userModel.find().sort({
      createdAt: -1,
    });
    return users;
  }

  async user(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async finds(input: any) {
    const user = await this.userModel.find(input);
    return user;
  }

  async createStaff(input: any) {
    try {
      const hashPassword = await argon.hash(input.password);
      return this.userModel.create({
        email: input.email,
        hashPassword: hashPassword,
        lastName: input.lastName,
        firstName: input.firstName,
        role: 'STAFF',
        phone: input.phone,
        avatar: input.avatar,
      });
    } catch (error) {
      throw error;
      console.log(error);
    }
  }
}
