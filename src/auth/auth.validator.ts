import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entities';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
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

    async validateLoginUserDto(dto: LoginDto): Promise<any> {
    

        // check for existing email
        const foundUser = await this.userRepository.findOne({ where: { email:dto.email } });

        if (!foundUser) {
            throwError('Email or password incorrect', HttpStatus.BAD_REQUEST);
        }

        const passwordMatches = await bcrypt.compare(dto.password, foundUser.password);

        if (!passwordMatches) {
            throwError('Email or password incorrect', HttpStatus.BAD_REQUEST);
        }


        // success
        return { foundUser };
    }
}
