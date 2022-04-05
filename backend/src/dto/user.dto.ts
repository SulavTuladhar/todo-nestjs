/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class UserDto {
    @IsString()
    username: string;
    
    @IsEmail()
    email: string;

    @IsString()
    password: string
}