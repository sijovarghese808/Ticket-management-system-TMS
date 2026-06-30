import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.userModel.findOne({ username, password }).exec(); // Simple match
//     return user ? user.toObject() : null;
//   }
}
