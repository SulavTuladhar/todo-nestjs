/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "../dto/index";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){ }

    @Post('register')
    resgiter(@Body() dto: AuthDto){
        return this.authService.register(dto)  
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto){
        return this.authService.login(dto)
    }

}