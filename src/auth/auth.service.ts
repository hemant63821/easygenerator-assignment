import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import { ErrorResponse, SuccessResponse } from './dto/Response.dto';
import { CreateUserDto, UserDto } from './dto/UserDto.dto';

@Injectable()
export class AuthService {
    private saltRounds : number = 0
    
    constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) {
        this.saltRounds = +(process.env.HASH_SALT_ROUNDS)
    }

    async create(payload: CreateUserDto): Promise<SuccessResponse | ErrorResponse> {
        const userExists = await this.userRepository.findOne({email : payload?.email})
        
        if(userExists)
            throw new HttpException('This Email Already exists!', HttpStatus.BAD_REQUEST);

        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const user  = new this.userRepository();
        user.name = this.getFormattedFullName(payload.name)
        user.password = hashedPassword
        user.email = payload.email
        const savedUserData = await user.save()
        return new SuccessResponse({userName : savedUserData.name, email : savedUserData.email}, `User ${user.name} Created Successfully`)
    }

    async signIn(payload: UserDto): Promise<SuccessResponse | ErrorResponse> {
        
        const userExists = await this.userRepository.findOne({email : payload.email});

        if (!userExists) 
            throw new HttpException('This email Does Not Exists! Please check your email', HttpStatus.BAD_REQUEST);

        const passwordMatch = await bcrypt.compare(payload.password, userExists.password);

        if (!passwordMatch) 
            throw new HttpException('Invalid Password!', HttpStatus.BAD_REQUEST);

        return new SuccessResponse({userName : userExists.name, email : userExists.email}, 'SUCCESS')
    }

    private getFormattedFullName = (userName : string) : string => {
        return userName?.
        split(' ')?.
        map(itr => itr.charAt(0).toUpperCase() + itr.slice(1)).join(' ') || ""
    }
}
