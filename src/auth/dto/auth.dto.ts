
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreateUserDto {
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    

    @IsNotEmpty()
    @IsString()
    readonly password: string;
    
    @IsNotEmpty()
    @IsString()
    readonly firstname: string;

    @IsNotEmpty()
    @IsString()
    readonly lastname: string;  
}


export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}