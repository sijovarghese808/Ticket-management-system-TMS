// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ username, password }); // Use bcrypt in real apps
  }
  async create(userData: { name: string; username: string; password: string }) {
    return this.userModel.create(userData);
  }
 // users.service.ts
async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
  
}
