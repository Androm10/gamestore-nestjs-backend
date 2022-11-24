import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IUserInfoRepository } from 'src/core/interfaces/user-info-repository.interface';
import { UserInfoFactoryService } from 'src/common/services/user-info-factory.service';
import { UserInfo } from 'src/sequelize/models';
import { UserInfoWhereFilter } from 'src/common/types/user-info-types';

@Injectable()
export class UserInfoRepository implements IUserInfoRepository {
  constructor(
    @InjectModel(UserInfo)
    private userInfoModel: typeof UserInfo,
    private userInfoFactoryService: UserInfoFactoryService,
  ) {}

  async getAll(where?: UserInfoWhereFilter) {
    const userInfos = await this.userInfoModel.findAll({ where: { ...where } });
    return this.userInfoFactoryService.createNewUserInfos(userInfos);
  }

  async get(id: number) {
    const userInfo = await this.userInfoModel.findOne({
      where: {
        userId: id,
      },
    });
    return this.userInfoFactoryService.createNewUserInfo(userInfo);
  }

  async create(item: any) {
    const userInfo = await this.userInfoModel.create(item);
    return this.userInfoFactoryService.createNewUserInfo(userInfo);
  }

  async update(id: number, item: any) {
    const userInfo = await this.userInfoModel.findOne({
      where: {
        userId: id,
      },
    });

    if (!userInfo) return null;

    await userInfo.update(item);
    return this.userInfoFactoryService.createNewUserInfo(userInfo);
  }

  async delete(id: number) {
    const userInfo = await this.userInfoModel.findOne({
      where: {
        userId: id,
      },
    });

    if (!userInfo) return false;

    await userInfo.destroy();
    return true;
  }
}
