/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/typeorm/todo";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private repo: Repository<Todo>){}

        getAllTodos(user){
            try{
                const id = user.id;
                return  this.repo.findBy({userId: id})

            }catch(err){
                return err;
            }
            
        }

        async createTodo(user,data: any){
            const todo = new Todo();
            todo.title = data.title;
            todo.description = data.description;
            todo.userId = user.id;
            
            this.repo.create(todo)
            try{
                return await this.repo.save(todo)

            }catch(err){
                return err;
            }
        }

        async editTodo(user,data,id){
            try{
                const todo = await this.repo.update({id, userId: user.id}, data);
                if(todo.affected === 0){
                    throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
                }
                return this.repo.findBy({id, userId: user.id})
            }catch(err){
                return err;
            }
        }

        async deleteTodo(user,id){
            try{
                const todo = await this.repo.delete({id, userId: user.id});
                if(todo.affected == 0){
                    throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND)
                }
                return 'Deleted'   
            }catch(err){
                return err;
            }
        }
}