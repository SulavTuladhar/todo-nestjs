/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn
    ({
        type: 'integer',
        name: 'todo_id'
    })
    id: number

    @Column()
    title: string

    @Column({
        nullable: true,
        default: ''
    })
    description: string

    @ManyToOne(()=> User, (user)=> user.todos)
    user: User

    @Column()
    userId: number
}