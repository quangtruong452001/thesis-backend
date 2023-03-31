import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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
    const user = this.userModel.findByIdAndDelete(id);
    return user;
  }
}
