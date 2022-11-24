import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';

import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';

import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@NoAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.logIn(loginDto);
  }

  @Post('login-admin')
  async loginAdmin(@Body() loginDto: LoginDto) {
    return await this.authService.loginAdmin(loginDto);
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signUp(signupDto);
  }
}
