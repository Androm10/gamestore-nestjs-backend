import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { transformToIso } from 'src/common/utils/transform-date';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class FilterGameQueryDto {
  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  priceUpperBoundary?: number;

  @IsOptional()
  priceLowerBoundary?: number;

  @IsOptional()
  @IsDateString()
  @Transform((releaseDateUpperBoundary) =>
    transformToIso(releaseDateUpperBoundary.value),
  )
  releaseDateUpperBoundary?: string;

  @IsOptional()
  @IsDateString()
  @Transform((releaseDateLowerBoundary) =>
    transformToIso(releaseDateLowerBoundary.value),
  )
  releaseDateLowerBoundary?: string;
}
