import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthValidator } from './auth.validator';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entities';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import { generateErrorResponse, generateSuccessResponse,  getTokens,  hashPassword } from '../common/utils/utils';
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
                password: hashedPassword,
                role:'user'
            });

            return generateSuccessResponse({
                statusCode: HttpStatus.CREATED,
                message: 'user account successfully created',
            });
        } catch (error) {
            return generateErrorResponse(error);
        }
    }


    async loginUser(dto: LoginDto): Promise<any> {
        try {
            const { foundUser } = await this.authValidator.validateLoginUserDto(dto);

            const {accessToken} = await getTokens(foundUser.id, foundUser.email);

            return generateSuccessResponse({
                statusCode: HttpStatus.OK,
                message: 'Login successfull',
                data: {
                    accessToken
                },
            });
        } catch (error) {
            return generateErrorResponse(error);
        }
    }

}
