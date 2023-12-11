import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name : User.name,
      schema : UserSchema
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
