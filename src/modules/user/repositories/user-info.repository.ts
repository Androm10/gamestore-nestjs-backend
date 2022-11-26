import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IUserInfoRepository } from 'src/core/interfaces/user-info-repository.interface';
import { UserInfo } from 'src/sequelize/models';
import { PaginationSequelize } from 'src/common/types/pagination-sequelize.type';
import { paginate } from 'src/common/utils/paginate';
import { FilterUserInfoQueryDto } from '../dto/filter-user-info-query.dto';
import { UserInfoFactoryService } from 'src/common/modules/factories/services/user-info-factory.service';
import { Op } from 'sequelize';

@Injectable()
export class UserInfoRepository implements IUserInfoRepository {
  constructor(
    @InjectModel(UserInfo)
    private userInfoModel: typeof UserInfo,
    private userInfoFactoryService: UserInfoFactoryService,
  ) {}

  async getAll(
    pagination: PaginationSequelize,
    filter?: FilterUserInfoQueryDto,
  ) {
    const query: any = {};

    if ('username' in filter) {
      query.username = {
        [Op.like]: `%${filter.username}%`,
      };
    }

    if (
      'dateOfBirthLowerBoundary' in filter ||
      'dateOfBirthUpperBoundary' in filter
    ) {
      query.dateOfBirth = {};
    }

    if ('dateOfBirthLowerBoundary' in filter) {
      query.dateOfBirth[Op.gte] = filter.dateOfBirthLowerBoundary;
    }

    if ('dateOfBirthUpperBoundary' in filter) {
      query.dateOfBirth[Op.lte] = filter.dateOfBirthUpperBoundary;
    }

    const userInfos = await this.userInfoModel.findAndCountAll({
      where: { ...query },
      ...pagination,
    });

    return paginate(
      pagination.limit,
      pagination.offset,
      userInfos.count,
      this.userInfoFactoryService.createNewUserInfos(userInfos.rows),
    );
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
