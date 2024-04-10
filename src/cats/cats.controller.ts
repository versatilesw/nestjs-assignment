import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
// import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
// import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { Response } from 'express';


@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @Post()
  // @Roles(['admin'])
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Get('')
  async findAll( @Res() res: Response) {
    const { status, ...responseData } = await this.catsService.findAll();

    return res.status(status).send(responseData);
  }

  // @Get(':id')
  // findOne(
  //   @Param('id', new ParseIntPipe())
  //   id: number,
  // ) {
  //   // get by ID logic
  // }
}
