import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class LoginDto {
  readonly login: string;

  readonly password: string;
}
