/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon from "argon2";
import { Todo } from "src/typeorm/todo";
import { User } from "src/typeorm/user";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private User: Repository<User>,
        @InjectRepository(Todo) private Todo: Repository<Todo>
    ){}

    async editUserInfo(user,data){
        const id = user.id;
        try{
            const hash = await argon.hash(data.password)
            data.password = hash
            const updatedUser = await this.User.update( id ,data); 
            return updatedUser
        }catch(err) {
            return err;     
        }
    }

    async deleteUser(user){
        // return user;
        const id = user.id;
        try{
            
            await this.Todo.delete({userId: id});
            await this.User.delete(id);
            console.log('ya samma pugyo');

            return 'User deleted'
        }catch(err){
            return err;
        }
        
    }
}