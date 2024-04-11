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
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseWithoutData } from 'src/common/common.entities';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }


  @Post()
  @ApiOperation({
    summary: 'Use to create a new cat',
  })
  @ApiOkResponse({
    description: 'Request completed successfully',

  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
    type: ResponseWithoutData,
  })

  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ResponseWithoutData,
  })
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async publicRegister(@Body() requestBody: CreateCatDto, @Res() res: Response) {
    const { status, ...responseData } = await this.catsService.create(requestBody);

    return res.status(status).send(responseData);
  }


  @Get('')
  @ApiOperation({
    summary: 'Use to get all cats',
  })
  @ApiOkResponse({
    description: 'Request completed successfully',

  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
    type: ResponseWithoutData,
  })

  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ResponseWithoutData,
  })
  async findAll(@Res() res: Response) {
    const { status, ...responseData } = await this.catsService.findAll();

    return res.status(status).send(responseData);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Use to get one cat',
  })
  @ApiOkResponse({
    description: 'Request completed successfully',

  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
    type: ResponseWithoutData,
  })

  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ResponseWithoutData,
  })
  async findOne(@Res() res: Response, @Param('id', new ParseIntPipe()) id: number,) {
    const { status, ...responseData } = await this.catsService.findOne(id);

    return res.status(status).send(responseData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
  @ApiOperation({
    summary: 'Use to update a cat',
  })
  @ApiOkResponse({
    description: 'Cat successfully updated',

  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
    type: ResponseWithoutData,
  })

  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ResponseWithoutData,
  })
  async update(@Res() res: Response, @Param('id', new ParseIntPipe()) id: number, @Body() requestBody: UpdateCatDto) {
    const { status, ...responseData } = await this.catsService.update(id, requestBody);

    return res.status(status).send(responseData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  @ApiOperation({
    summary: 'Use to delete a cat',
  })
  @ApiOkResponse({
    description: 'Cat successfully deleted',

  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
    type: ResponseWithoutData,
  })

  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ResponseWithoutData,
  })
  async delete(@Res() res: Response, @Param('id', new ParseIntPipe()) id: number,) {
    const { status, ...responseData } = await this.catsService.delete(id);

    return res.status(status).send(responseData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER)
  @Post(':id/favourite')
  @ApiOperation({
    summary: 'Use to add a cat as favourite',
  })
  @ApiOkResponse({
    description: 'Cat successfully added as favourite',

  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
    type: ResponseWithoutData,
  })

  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ResponseWithoutData,
  })
  async addCatAsFavourite(@Res() res: Response, @Body() requestBody: AddCatAsFavouriteDto, @Param('id', new ParseIntPipe()) id: number,) {
    const { status, ...responseData } = await this.catsService.addCatAsFavourite(requestBody.catId,id);

    return res.status(status).send(responseData);
  }


}
