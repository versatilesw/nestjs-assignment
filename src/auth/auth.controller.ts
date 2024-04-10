import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) { }

    @Post('register')
    async publicRegister(@Body() requestBody: CreateUserDto, @Res() res: Response) {
        const { status, ...responseData } = await this.AuthService.createAccount(requestBody);

        return res.status(status).send(responseData);
    }


    // @Post('login')
    // async login(@Body() requestBody: LoginDto, @Res() res: Response) {
    //     const { status, ...responseData } = await this.AuthService.loginUser(requestBody);

    //     return res.status(status).send(responseData);
    // }

}
