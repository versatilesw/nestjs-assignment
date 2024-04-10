import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entities';
import { CreateUserDto } from './dto/auth.dto';
import { throwError } from '../common/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthValidator {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async validateCreateAccountDto(params: CreateUserDto): Promise<any> {
    
        // check for existing email
        const foundUser = await this.userRepository.findOne({where:{email:params.email}});

        if (foundUser) {
            throwError('A user already exist with this email', HttpStatus.CONFLICT);
        }

        // success
        return 'Passed';
    }

    // async validateLoginUserDto(dto: LoginDto): Promise<any> {
    //     // joi validation
    //     const joiSchema = joi.object({
    //         email: joi.string().required().label('Email address'),
    //         password: joi.string().required().label('Password'),
    //     });
    //     const joiValidationResults = validateJoiSchema(joiSchema, dto);

    //     // check the results from joi validation
    //     if (joiValidationResults) {
    //         throwError(joiValidationResults, HttpStatus.BAD_REQUEST);
    //     }

    //     // check for existing email
    //     const foundUser = await this.usersRepository.retrieveUserAndHashedPasswordByEmail(dto.email);

    //     if (!foundUser) {
    //         throwError('Email or password incorrect', HttpStatus.BAD_REQUEST);
    //     }

    //     const passwordMatches = await bcrypt.compare(dto.password, foundUser.hashedPassword);

    //     if (!passwordMatches) {
    //         throwError('Email or password incorrect', HttpStatus.BAD_REQUEST);
    //     }

    //     // check if user is deleted
    //     if (foundUser.status === CustomerStatus.deleted) {
    //         throwError('User deleted', HttpStatus.BAD_REQUEST);
    //     }

    //     // success
    //     return { foundUser };
    // }
}
