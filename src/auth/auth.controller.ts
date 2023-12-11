import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorResponse, SuccessResponse } from './dto/Response.dto';
import { CreateUserDto, UserDto } from './dto/UserDto.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() userPayload: CreateUserDto): Promise<SuccessResponse | ErrorResponse> {
        return this.authService.create(userPayload);
    }

    @Post('sign-in')
    async signIn(@Body() userPayload: UserDto): Promise<SuccessResponse | ErrorResponse> {
        return this.authService.signIn(userPayload);
    }

}
