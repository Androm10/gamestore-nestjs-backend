import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { transformToIso } from 'src/common/utils/transform-date';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class FilterUserInfoQueryDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsDateString()
  @Transform((dateOfBirthUpperBoundary) =>
    transformToIso(dateOfBirthUpperBoundary.value),
  )
  dateOfBirthUpperBoundary?: string;

  @IsOptional()
  @IsDateString()
  @Transform((dateOfBirthLowerBoundary) =>
    transformToIso(dateOfBirthLowerBoundary.value),
  )
  dateOfBirthLowerBoundary?: string;
}
