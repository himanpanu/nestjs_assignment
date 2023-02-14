import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './auth/auth.module';
import { UserMiddleware } from './users/user.middleware';
import { UsersModule } from './users/user.module';
import { mongoUrl } from './utils/constants';
import * as csrf from 'csurf';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(mongoUrl)],
})
export class AppModule {}
