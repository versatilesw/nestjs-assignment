import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCatDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: string;

  @IsString()
  readonly breed: string;
}


export class UpdateCatDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsInt()
  @IsOptional()
  readonly age?: string;

  @IsString()
  @IsOptional()
  readonly breed?: string;
}

export class AddCatAsFavouriteDto {
  @IsNumber()
  readonly catId: number;
}
