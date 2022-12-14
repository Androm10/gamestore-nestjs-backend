import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import {
  USER_INFO_REPOSITORY,
  USER_REPOSITORY,
} from 'src/common/constants/tokens';
import { UserInfoWhereFilter } from 'src/common/types/user-info-types';

import { IUserInfoRepository } from 'src/core/interfaces/user-info-repository.interface';
import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { CreateUserInfoDto } from '../dto/create-user-info.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  constructor(
    @Inject(USER_INFO_REPOSITORY)
    private userInfoRepository: IUserInfoRepository,
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async getAll(where?: UserInfoWhereFilter) {
    const userInfos = await this.userInfoRepository.getAll(where);
    return userInfos;
  }

  async get(id: number) {
    const userInfo = await this.userInfoRepository.get(id);

    if (!userInfo) throw new NotFoundException('No such user info');

    return userInfo;
  }

  async create(dto: CreateUserInfoDto) {
    const user = await this.userRepository.get(dto.userId);

    if (!user) throw new BadRequestException('No such user');

    const userInfo = await this.userInfoRepository.create(dto);

    if (!userInfo) throw new BadRequestException('Cannot create user info');

    return userInfo;
  }

  async update(id: number, dto: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.update(id, dto);

    if (!userInfo) throw new NotFoundException('No such user info');

    return userInfo;
  }

  async delete(id: number) {
    const result = await this.userInfoRepository.delete(id);
    return { result };
  }
}
