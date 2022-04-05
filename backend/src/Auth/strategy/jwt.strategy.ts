/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./../../typeorm/user";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
    ){
    constructor(config: ConfigService, @InjectRepository(User) private User: Repository<User> ){
        super({ 
            jwtFromRequest: 
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        });
    }
    async validate(payload: {
        sub: number,
        email: string
    }){
        try{
            const user = await this.User.findOneBy({id : payload.sub})            
            if(user){
                user.password = ''
                return user;
            }
        }catch(error){
            return error;
        }
    }
}