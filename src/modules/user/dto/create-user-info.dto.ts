import {
  MinLength,
  MaxLength,
  IsInt,
  IsPositive,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateUserInfoDto {
  @IsPositive()
  @IsInt()
  userId: number;

  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsOptional()
  description: string;

  @IsDateString()
  dateOfBirth: string;
}
