import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entities';
import { Cat } from './cats/entities/cats.entities';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rafique',
    password: 'Flipmone1',
    database: 'test',
    entities: [User,Cat],
    synchronize: true,
  }), CoreModule, CatsModule, AuthModule, CommonModule],

})
export class AppModule { }
