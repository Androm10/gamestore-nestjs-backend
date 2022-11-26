import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { Role, User } from 'src/sequelize/models';
import { RegistrationData } from 'src/common/types/registration-data';
import { PaginationSequelize } from 'src/common/types/pagination-sequelize.type';
import { paginate } from 'src/common/utils/paginate';
import { GameFactoryService } from 'src/common/modules/factories/services/game-factory.service';
import { UserFactoryService } from 'src/common/modules/factories/services/user-factory.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
    private userFactoryService: UserFactoryService,
    private gameFactoryService: GameFactoryService,
  ) {}

  async getAll(pagination: PaginationSequelize) {
    const users = await this.userModel.findAndCountAll({ ...pagination });

    return paginate(
      pagination.limit,
      pagination.offset,
      users.count,
      this.userFactoryService.createNewUsers(users.rows),
    );
  }

  async getGameCollection(pagination: PaginationSequelize, userId: number) {
    const user = await this.userModel.findByPk(userId);
    const games = await user.$get('games', { ...pagination });
    return paginate(
      pagination.limit,
      pagination.offset,
      games.length,
      this.gameFactoryService.createNewGames(games),
    );
  }

  async get(id: number) {
    const user = await this.userModel.findByPk(id);
    return this.userFactoryService.createNewUser(user);
  }

  async create(item: any) {
    const user = await this.userModel.create(item);
    return this.userFactoryService.createNewUser(user);
  }

  async update(id: number, item: any) {
    const user = await this.userModel.findByPk(id);

    if (!user) return null;

    await user.update(item);
    return this.userFactoryService.createNewUser(user);
  }

  async delete(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) return false;

    await user.destroy();
    return true;
  }

  async getRoles(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) return null;

    const roles = await user.$get('roles');

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
    }));
  }

  async getByLogin(login: string) {
    const user = await this.userModel.findOne({
      where: {
        login,
      },
    });

    if (!user) return null;

    return this.userFactoryService.createNewUser(user);
  }

  async registerUser(registrationData: RegistrationData) {
    try {
      return await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const user = await this.userModel.create(
          {
            login: registrationData.login,
            password: registrationData.password,
          },
          transactionHost,
        );

        const userRole = await this.roleModel.findOne({
          where: { name: 'User' },
          ...transactionHost,
        });

        await user.$add('role', userRole, transactionHost);
        await user.$create(
          'userInfo',
          { username: registrationData.username },
          transactionHost,
        );

        return this.userFactoryService.createNewUser(user);
      });
    } catch (error) {
      throw error;
    }
  }
}
