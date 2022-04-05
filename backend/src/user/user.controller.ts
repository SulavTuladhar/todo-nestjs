/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { getUser } from './../Auth/decorator/getUser.decorator';
import { JwtGaurd } from './../Auth/Gaurd/jwt.gaurd';
import { User } from './../typeorm/user';
import { UserService } from './user.service';

@UseGuards(JwtGaurd) 
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get('get-single-user')
    getMe(@getUser() user: User){
        return user;
    }

    @Put('edit-user')
    editUserInfo(@getUser() user: User, @Body() data: UserDto){
        return this.userService.editUserInfo(user, data)
    }

    @Delete('delete-user')
    deleteUser(@getUser() user: User){
        return this.userService.deleteUser(user);
    }
}
 