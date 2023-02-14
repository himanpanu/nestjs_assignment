import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
