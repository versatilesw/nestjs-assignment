import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { AddCatAsFavouriteDto, CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { Roles } from '../auth/entities/auth.entities';
import { Role } from '../common/decorators/roles.decorator';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }


  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async publicRegister(@Body() requestBody: CreateCatDto, @Res() res: Response) {
    const { status, ...responseData } = await this.catsService.create(requestBody);

    return res.status(status).send(responseData);
  }


  @Get('')
  async findAll(@Res() res: Response) {
    const { status, ...responseData } = await this.catsService.findAll();

    return res.status(status).send(responseData);
  }


  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', new ParseIntPipe()) id: number,) {
    const { status, ...responseData } = await this.catsService.findOne(id);

    return res.status(status).send(responseData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
  async update(@Res() res: Response, @Param('id', new ParseIntPipe()) id: number, @Body() requestBody: UpdateCatDto) {
    const { status, ...responseData } = await this.catsService.update(id, requestBody);

    return res.status(status).send(responseData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  async delete(@Res() res: Response, @Param('id', new ParseIntPipe()) id: number,) {
    const { status, ...responseData } = await this.catsService.delete(id);

    return res.status(status).send(responseData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER)
  @Post(':id/favourite')
  async addCatAsFavourite(@Res() res: Response, @Body() requestBody: AddCatAsFavouriteDto, @Param('id', new ParseIntPipe()) id: number,) {
    const { status, ...responseData } = await this.catsService.addCatAsFavourite(requestBody.catId,id);

    return res.status(status).send(responseData);
  }


}
