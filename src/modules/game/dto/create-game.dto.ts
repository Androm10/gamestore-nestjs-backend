import {
  MinLength,
  MaxLength,
  IsPositive,
  IsDateString,
  IsNumber,
  Min,
  Max,
  IsEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { transformToIso } from 'src/common/utils/transform-date';

// TODO: divide price and discount to a different tables,
// to make them variable to different countries

export class CreateGameDto {
  @IsEmpty()
  authorId: number;

  @MinLength(3)
  @MaxLength(30)
  name: string;

  description: string;

  @Transform((releaseDate) => transformToIso(releaseDate.value))
  @IsDateString()
  releaseDate: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  discount: number;
}
