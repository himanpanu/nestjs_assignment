import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      signOptions: { expiresIn: '10s' },
    }),
    PassportModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
