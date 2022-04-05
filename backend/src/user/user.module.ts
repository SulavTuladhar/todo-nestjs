/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm/todo';
import { User } from 'src/typeorm/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Todo])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
