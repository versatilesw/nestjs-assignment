import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthValidator } from './auth.validator';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entities';
import { CreateUserDto } from './dto/auth.dto';
import { generateErrorResponse, generateSuccessResponse,  hashPassword } from '../common/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly authValidator: AuthValidator,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createAccount(dto: CreateUserDto): Promise<any> {
        try {
         
            await this.authValidator.validateCreateAccountDto(dto);
         
            const hashedPassword = await hashPassword(dto.password);

            await this.userRepository.save({
                email: dto.email,
                firstname: dto.firstname,
                lastname: dto.lastname,
                dateCreated: new Date().toISOString(),
                password: hashedPassword
            });

            return generateSuccessResponse({
                statusCode: HttpStatus.CREATED,
                message: 'user account successfully created',
            });
        } catch (error) {
            return generateErrorResponse(error);
        }
    }


    // async loginUser(dto: LoginDto): Promise<ResponseWithData> {
    //     try {
    //         const { foundUser } = await this.authValidator.validateLoginUserDto(dto);

    //         const tokens = await getTokens(foundUser.id, foundUser.email);
    //         const refreshToken = await hashPassword(tokens.refreshToken);

    //         await this.usersRepository.updateUserById(foundUser.id, { refreshToken });

    //         const user = {
    //             id: foundUser.id,
    //             email: foundUser.email,
    //             firstName: foundUser.firstName,
    //             lastName: foundUser.lastName,
    //         };

    //         const daysToExpire = moment().add(config.jwtExpiresIn, 'd');
    //         const backendTokens = {
    //             accessToken: tokens.accessToken,
    //             refreshToken: tokens.refreshToken,
    //             expiresIn: daysToExpire,
    //         };

    //         return generateSuccessResponse({
    //             statusCode: HttpStatus.OK,
    //             message: 'Login successfull',
    //             data: {
    //                 user,
    //                 backendTokens,
    //             },
    //         });
    //     } catch (error) {
    //         logError(`An error occurred while logging in user: ${error} : ${JSON.stringify(dto)}`);
    //         return generateErrorResponse(error);
    //     }
    // }

}
