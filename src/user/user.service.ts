import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserInput } from 'src/dto/user.dto';
import {
  User,
  UserDocument,
  // UserSchema
} from '../model/user.schema';
import { Model, Types } from 'mongoose';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  //
  async allUser() {
    const users = await this.userModel.find().populate('avatar').sort({
      createdAt: -1,
    });
    return users;
  }

  async user(id: string) {
    const user = await this.userModel.findById(id).populate('avatar');
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserInput) {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, {
          new: true,
        })
        .populate('avatar');
      return user;
    } catch (error) {
      throw new Error(`Could not update User with ${id}: ${error.message}`);
    }
  }

  async finds(input: any) {
    const user = await this.userModel.find(input).populate('avatar');
    return user;
  }

  async createStaff(input: any) {
    try {
      const newAvatar = new Types.ObjectId(input.avatar.toString());
      console.log('input to service', newAvatar);
      const hashPassword = await argon.hash(input.password);
      const newStaff = await this.userModel.create({
        email: input.email,
        hashPassword: hashPassword,
        lastName: input.lastName,
        firstName: input.firstName,
        role: 'STAFF',
        avatar: newAvatar,
        phone: input.phone,
      });
      await newStaff.save();
      return await newStaff.populate('avatar');
    } catch (error) {
      throw error;
      console.log(error);
    }
  }
}
