import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat} from './entities/cats.entities';
import { Repository } from 'typeorm';
import { generateErrorResponse, generateSuccessResponse } from '../common/utils/utils';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
  ) { }

  async create(dto:CreateCatDto): Promise<any> {
    try {

      const cat = await this.catRepository.save({
        age: dto.age,
        breed: dto.breed,
        name:dto.name
      })

      return generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: 'Request completed successfully',
        data: cat,
      });
    } catch (error) {
      return generateErrorResponse(error);
    }
  }

  async findAll(): Promise<any> {
    try {

      const allCats = await this.catRepository.find()

      return generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: 'Request completed successfully',
        data: allCats,
      });
    } catch (error) {
      return generateErrorResponse(error);
    }
  }
}
