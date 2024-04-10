import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCatDto {
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
