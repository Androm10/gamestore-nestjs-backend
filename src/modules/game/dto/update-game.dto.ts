import {
  MinLength,
  MaxLength,
  IsPositive,
  IsDateString,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { transformToIso } from 'src/common/utils/transform-date';

// TODO: divide price and discount to a different tables,
// to make them variable to different countries

export class UpdateGameDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsDateString()
  @Transform((releaseDate) => transformToIso(releaseDate.value))
  releaseDate: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1)
  discount: number;
}
