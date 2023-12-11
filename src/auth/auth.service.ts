import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import { ErrorResponse, SuccessResponse } from './dto/Response.dto';
import { CreateUserDto, UserDto } from './dto/UserDto.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) {}

    async create(payload: CreateUserDto): Promise<SuccessResponse | ErrorResponse> {
       return null
    }

    async signIn(payload: UserDto): Promise<SuccessResponse | ErrorResponse> {
        return null
    }
}
