/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "../dto/index";
import * as argon from 'argon2';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./../typeorm/user";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
   constructor(@InjectRepository(User) private User: Repository<User>,
                private jwt: JwtService,
                private config: ConfigService
   ){}
    
   async register(dto: AuthDto){
        // Generate the password hash
        // Save new user in the db
        try{
            const hash = await argon.hash(dto.password);
            const data = new User();
            console.log('first ka data >>', data);
            
            data.email = dto.email;
            data.password = hash;
            data.username = dto.username;   

            console.log('data is >>', data);
            this.User.create(data)
            return await this.User.save(data)

        }catch(err){
            return err;
        }
    }

    async login(dto){
        // Find the user by username
        const username = dto.username;
        const user = await this.User.findOneBy({username})

        // If user does not exit thow exception
        if(!user) throw new ForbiddenException(
            'Credentials incorrect',
        );

        // Compare password
        const passwaordMatches = await argon.verify(user.password, dto.password);

        // if password incorrect throw exceptopn
        if(!passwaordMatches) throw new ForbiddenException(
            'Credentials incorrect',
        );

        // send user
        return this.signToken(user.id,user.username);
    }

    async signToken(user_id: number, username: string){
        const payload = {
            sub: user_id,
            username
        }
        const secret = this.config.get('JWT_SECRET');
        // console.log('secret is >>', secret);
      
        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: secret
        });
        return {
            access_token: token,
            username
        }
    }
}