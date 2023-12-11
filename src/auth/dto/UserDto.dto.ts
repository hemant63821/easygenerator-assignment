import { IsEmail, IsNotEmpty } from "class-validator";
import { IsValidPassword } from "src/decorators/ValidPassword.decorator";

export class UserDto {
   
    @IsNotEmpty()
    @IsValidPassword({message : 'Invalid Password Format'})
    password: string;
   
    @IsEmail()
    email: string;
   
}

export class CreateUserDto extends UserDto {
   
    @IsNotEmpty()
    name: string;

}