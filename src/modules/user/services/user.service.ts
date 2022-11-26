import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { USER_REPOSITORY } from 'src/common/constants/tokens';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async getAll(paginationDto: PaginationQueryDto) {
    const limit = paginationDto.limit;
    const offset = paginationDto.page * limit;

    const users = await this.userRepository.getAll({ limit, offset });
    return users;
  }

  async getGameCollection(paginationDto: PaginationQueryDto, userId: number) {
    const user = await this.userRepository.get(userId);

    if (!user) throw new NotFoundException('No such user');

    const limit = paginationDto.limit;
    const offset = paginationDto.page * limit;

    const games = await this.userRepository.getGameCollection(
      { limit, offset },
      userId,
    );
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
