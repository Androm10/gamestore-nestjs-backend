import { IsBoolean, IsEmpty, IsInt, IsPositive } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsEmpty()
  userId: number;

  @IsPositive()
  @IsInt()
  gameId: number;

  @IsBoolean()
  isRecommended: boolean;

  text: string;
}
