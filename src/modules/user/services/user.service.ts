import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { USER_REPOSITORY } from 'src/common/constants/tokens';

import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async getAll() {
    const users = await this.userRepository.getAll();
    return users;
  }

  async getGameCollection(userId: number) {
    const user = await this.userRepository.get(userId);

    if (!user) throw new NotFoundException('No such user');

    const games = await this.userRepository.getGameCollection(userId);
    return games;
  }

  async get(id: number) {
    const user = await this.userRepository.get(id);

    if (!user) throw new NotFoundException('No such user');

    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    if (!user) throw new BadRequestException('Cannot create user');

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.update(id, dto);

    if (!user) throw new NotFoundException('No such user');

    return user;
  }

  async delete(id: number) {
    const result = await this.userRepository.delete(id);
    return { result };
  }

  async getRoles(id: number) {
    const roles = await this.userRepository.getRoles(id);

    if (!roles) throw new NotFoundException('No such user');

    return roles;
  }

  async registerUser(signupDto: SignupDto) {
    const user = await this.userRepository.registerUser(signupDto);
    return user;
  }

  async getByLogin(login: string) {
    const user = await this.userRepository.getByLogin(login);
    return user;
  }
}
