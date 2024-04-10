import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cats.entities';
import { FavouriteCat } from '../auth/entities/auth.entities';


@Module({
  imports: [TypeOrmModule.forFeature([Cat,FavouriteCat]),],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
