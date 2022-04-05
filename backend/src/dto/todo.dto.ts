/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class TodoDto{
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string
}