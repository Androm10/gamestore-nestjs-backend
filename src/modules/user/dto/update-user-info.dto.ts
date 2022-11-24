import {
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UpdateUserInfoDto {
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  username: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;
}
