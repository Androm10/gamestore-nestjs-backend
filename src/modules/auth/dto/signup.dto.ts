import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class SignupDto {
  @IsEmail()
  @MinLength(3)
  @MaxLength(20)
  readonly login: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;

  @Match('password')
  readonly passwordConfirmation: string;

  @MaxLength(20)
  @MinLength(3)
  readonly username: string;
}
