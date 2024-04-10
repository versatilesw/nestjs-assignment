import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy} from './strategies';
import { SessionSerializer } from './session.serielizer';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        JwtModule.register({}),
    ],
    controllers: [],
    providers: [
        JwtStrategy,
        SessionSerializer,
    ],
})
    
export class CommonModule { }
