/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { getUser } from "src/Auth/decorator";
import { JwtGaurd } from "src/Auth/Gaurd";
import { TodoDto } from "src/dto";
import { User } from "./../typeorm/user";
import { TodoService } from "./todo.service";

@UseGuards(JwtGaurd)
@Controller('todo')
export class TodoController{
    constructor(private todoService: TodoService){}

    @Get('allTodos')
    getAllTodos(@getUser() user: User){
        return this.todoService.getAllTodos(user)
    }

    @Post('todo')
    createTodo(@getUser() user: User, @Body() data: TodoDto ){
        return this.todoService.createTodo(user,data)
    }

    @Put('edit-todo/:id')
    editTodo(
            @getUser() user: User, 
            @Body() data: TodoDto,
            @Param('id') id: number    
    ){
        return this.todoService.editTodo(user,data,id);
    }

    @Delete('delete-todo/:id')
    deleteTodo(
        @getUser() user: User, 
        @Param('id') id: number 
    ){
        return this.todoService.deleteTodo(user,id);
    }

}