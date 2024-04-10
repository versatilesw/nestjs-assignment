import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat} from './entities/cats.entities';
import { Repository } from 'typeorm';
import { generateErrorResponse, generateSuccessResponse } from '../common/utils/utils';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
  ) { }

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }

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
