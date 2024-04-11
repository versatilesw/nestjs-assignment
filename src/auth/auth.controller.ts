import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto} from './dto/auth.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseWithoutData } from '../common/common.entities';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly AuthService: AuthService) { }

    @Post('register')
    @ApiOperation({
        summary: 'Use to register new accounts',
    })
    @ApiOkResponse({
        description: 'user account successfully created',

    })
    @ApiBadRequestResponse({
        description: 'Bad Request: Validation error',
        type: ResponseWithoutData,
    })

    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
        type: ResponseWithoutData,
    })
    async publicRegister(@Body() requestBody: CreateUserDto, @Res() res: Response) {
        const { status, ...responseData } = await this.AuthService.createAccount(requestBody);

        return res.status(status).send(responseData);
    }


    @Post('login')
    @ApiOperation({
        summary: 'Use to login to an account',
    })
    @ApiOkResponse({
        description: 'Login successfull',

    })
    @ApiBadRequestResponse({
        description: 'Bad Request: Validation error',
        type: ResponseWithoutData,
    })

    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
        type: ResponseWithoutData,
    })
    async login(@Body() requestBody: LoginDto, @Res() res: Response) {
        const { status, ...responseData } = await this.AuthService.loginUser(requestBody);

        return res.status(status).send(responseData);
    }

}
