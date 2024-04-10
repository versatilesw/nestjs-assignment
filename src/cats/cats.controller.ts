import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
// import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { Roles } from '../auth/entities/auth.entities';
import { Role } from '../common/decorators/roles.decorator';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async publicRegister(@Body() requestBody: CreateCatDto, @Res() res: Response) {
    const { status, ...responseData } = await this.catsService.create(requestBody);

    return res.status(status).send(responseData);
  }


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
