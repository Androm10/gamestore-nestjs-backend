import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { transformToIso } from 'src/common/utils/transform-date';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class FilterReviewQueryDto {
  @IsOptional()
  isRecommended?: boolean;

  @IsOptional()
  @IsDateString()
  @Transform((creationDateUpperBoundary) =>
    transformToIso(creationDateUpperBoundary.value),
  )
  creationDateUpperBoundary?: string;

  @IsOptional()
  @IsDateString()
  @Transform((creationDateLowerBoundary) =>
    transformToIso(creationDateLowerBoundary.value),
  )
  creationDateLowerBoundary?: string;

  @IsOptional()
  userId?: number;

  @IsOptional()
  gameId?: number;
}
