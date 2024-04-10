import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy} from './strategies';
import { SessionSerializer } from './session.serielizer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/auth.entities';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        JwtModule.register({}),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [],
    providers: [
        JwtStrategy,
        SessionSerializer,
    ],
})
    
export class CommonModule { }
