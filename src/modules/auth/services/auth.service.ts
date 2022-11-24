import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'src/common/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(id: number) {
    try {
      const user = await this.userService.get(id);
      return user;
    } catch (error) {
      return null;
    }
  }

  async logIn(user: any) {
    const found = await this.userService.getByLogin(user.login);

    if (found?.login != user.login) {
      throw new BadRequestException('Login or password is incorrect');
    }
    if (!bcrypt.comparePassword(user.password, found.password)) {
      throw new BadRequestException('Login or password is incorrect');
    }

    const payload = { userId: found.id };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>('auth.expiresIn'),
    };
  }

  async loginAdmin(user: any) {
    const found = await this.userService.getByLogin(user.login);

    if (found?.login != user.login) {
      throw new BadRequestException('Login or password is incorrect');
    }
    if (!bcrypt.comparePassword(user.password, found.password)) {
      throw new BadRequestException('Login or password is incorrect');
    }

    const roles = await this.userService.getRoles(found.id);

    if (!roles.map((role) => role.name).includes('Admin')) {
      throw new BadRequestException('No such admin');
    }

    const payload = { userId: found.id };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>('auth.expiresIn'),
    };
  }

  async signUp(userData: any) {
    if (await this.userService.getByLogin(userData.login)) {
      throw new BadRequestException('User with such login already exists');
    }

    return await this.userService.registerUser({
      status: 'active',
      ...userData,
    });
  }
}
