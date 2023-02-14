import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto, SignUpAuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';
import { User } from '../users/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface ReqInfo extends Request {
  user: any;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignUpAuthDto) {
    const { email, password, firstName, lastName } = dto;

    const userExists = await this.userModel
      .findOne({
        email,
      })
      .exec();

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const createdUser = await newUser.save();

    return { message: 'User created succefully' };
  }

  async signin(dto: AuthDto, req: ReqInfo, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.userModel
      .findOne({
        email,
      })
      .select('+password')
      .exec();

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const compareSuccess = await this.comparePasswords({
      password,
      hash: foundUser.password,
    });

    if (!compareSuccess) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      userId: foundUser._id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    res.cookie('token', token, {});
    req.user = foundUser;
    console.log(req.user);

    return res.send({ message: 'Logged in successfully', token });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out succefully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: string; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: 86400,
    });

    return token;
  }
}
