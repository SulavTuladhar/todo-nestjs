/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator"

/* eslint-disable prettier/prettier */
export class AuthDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    // @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    password: string;

}