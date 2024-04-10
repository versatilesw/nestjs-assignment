import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cats.entities';
import { AppModule } from '../app.module';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Cat]),AppModule],
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [
        {
          age: "2",
          breed: 'Bombay',
          name: 'Pixel',
          id: 1,
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(async () => result);

      expect(await catsController.findAll({} as any)).toBe(result);
    });
  });
});
