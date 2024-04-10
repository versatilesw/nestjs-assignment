import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy} from '../common/strategies/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidator } from './auth.validator';
import { SessionSerializer } from '../common/session.serielizer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        JwtModule.register({}),
       TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthValidator,
        JwtStrategy,
        SessionSerializer,
    ],
})
export class AuthModule { }



