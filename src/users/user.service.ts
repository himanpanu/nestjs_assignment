import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getMyUser(id: string) {
    const foundUser = await this.userModel.findOne({ _id: id }).exec();

    if (!foundUser) {
      throw new NotFoundException();
    }

    return { user: foundUser };
  }

  async getUsers(params) {
    const perPage = params?.perPage || 10;
    const page = Math.max(1, Number(params?.page || 0)) - 1;
    const filterText = params?.search;
    console.log(params);
    const users = await this.userModel
      .find({
        $or: [
          {
            firstName: {
              $regex: filterText ?? '',
              $options: 'i',
            },
          },
          {
            lastName: {
              $regex: filterText ?? '',
              $options: 'i',
            },
          },
          {
            email: {
              $regex: filterText ?? '',
              $options: 'i',
            },
          },
        ],
      })
      .limit(perPage)
      .skip(perPage * page)
      .exec();

    return { users };
  }

  async updateUser(id: string, body) {
    const userExists = await this.userModel
      .findOne({
        _id: id,
      })
      .exec();

    if (!userExists) {
      throw new BadRequestException("User doesn't exists");
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();

    return { message: 'User updated succefully', updatedUser };
  }

  async deleteUser(id: string) {
    const userExists = await this.userModel
      .findOne({
        _id: id,
      })
      .exec();

    if (!userExists) {
      throw new BadRequestException("User doesn't exists");
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (deletedUser) {
      return { message: 'User deleted successfully' };
    } else {
      throw new BadRequestException('Something wrong happened');
    }
  }
}
