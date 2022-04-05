/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Todo } from "./todo";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'user_id',
    })
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        default: '',
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @OneToMany(()=> Todo, (todo)=> todo.user)
    todos: Todo

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    
}