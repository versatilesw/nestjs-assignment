import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/entities/cats.entities';

@Module({
  imports: [CoreModule, CatsModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rafique',
    password: 'Flipmone1',
    database: 'test',
    entities: [Cat],
    synchronize: true,
    autoLoadEntities:true
  }),

  ],
})
export class AppModule {}
