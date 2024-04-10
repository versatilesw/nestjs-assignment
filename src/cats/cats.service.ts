import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cats.entities';
import { Repository } from 'typeorm';
import { generateErrorResponse, generateSuccessResponse, throwError } from '../common/utils/utils';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
  ) { }

  async create(dto: CreateCatDto): Promise<any> {
    try {

      const cat = await this.catRepository.save({
        age: dto.age,
        breed: dto.breed,
        name: dto.name
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

  async findOne(id: number): Promise<any> {
    try {

      const foundCat = await this.catRepository.findOne({ where: { id } })

      if (!foundCat) {
        throwError('Cat not found', HttpStatus.NOT_FOUND);
      }

      return generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: 'Request completed successfully',
        data: foundCat,
      });
    } catch (error) {
      return generateErrorResponse(error);
    }
  }

  async update(id: number,dto:UpdateCatDto): Promise<any> {
    try {

      const foundCat = await this.catRepository.findOne({ where: { id } })

      if (!foundCat) {
        throwError('Cat does not exist', HttpStatus.NOT_FOUND);
      }

      if (!dto.age && !dto.breed && !dto.name) {
        throwError('Please provide at least one field to update', HttpStatus.BAD_REQUEST);
      }

      await this.catRepository.update(id, {
        age: dto.age,
        breed: dto.breed,
        name: dto.name
      })

      return generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: 'Cat successfully updated',
      });
    } catch (error) {
      return generateErrorResponse(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {

      const foundCat = await this.catRepository.findOne({ where: { id } })

      if (!foundCat) {
        throwError('Cat does not exist', HttpStatus.NOT_FOUND);
      }

      await this.catRepository.delete(id)

      return generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: 'Cat successfully deleted',
      });
    } catch (error) {
      return generateErrorResponse(error);
    }
  }
}
