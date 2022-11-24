import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UpdateReviewDto {
  @IsOptional()
  @IsBoolean()
  isRecommended: boolean;

  @IsOptional()
  text: string;
}
