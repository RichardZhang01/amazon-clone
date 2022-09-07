import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserData } from './userData.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserData(user: UserDocument): UserData {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserData | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserData(user);
  }

  async create(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
