import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @MinLength(3)
  @MaxLength(20)
  login: string;
}
