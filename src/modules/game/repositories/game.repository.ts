import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IGameRepository } from 'src/core/interfaces/game-repository.interface';
import { Game } from 'src/sequelize/models';
import { PaginationSequelize } from 'src/common/types/pagination-sequelize.type';
import { paginate } from 'src/common/utils/paginate';
import { FilterGameQueryDto } from '../dto/filter-game-query.dto';
import { GameFactoryService } from 'src/common/modules/factories/services/game-factory.service';
import { Op } from 'sequelize';

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(
    @InjectModel(Game) private gameModel: typeof Game,
    private gameFactoryService: GameFactoryService,
  ) {}

  async getAll(pagination: PaginationSequelize, filter?: FilterGameQueryDto) {
    const query: any = {};
    if ('authorId' in filter) {
      query.authorId = filter.authorId;
    }

    if ('name' in filter) {
      query.name = {
        [Op.like]: `%${filter.name}%`,
      };
    }

    if ('priceLowerBoundary' in filter || 'priceUpperBoundary' in filter) {
      query.price = {};
    }

    if ('priceLowerBoundary' in filter) {
      query.price[Op.gte] = filter.priceLowerBoundary;
    }

    if ('priceUpperBoundary' in filter) {
      query.price[Op.lte] = filter.priceUpperBoundary;
    }

    if (
      'releaseDateLowerBoundary' in filter ||
      'releaseDateUpperBoundary' in filter
    ) {
      query.releaseDate = {};
    }

    if ('releaseDateLowerBoundary' in filter) {
      query.releaseDate[Op.gte] = filter.releaseDateLowerBoundary;
    }

    if ('releaseDateUpperBoundary' in filter) {
      query.releaseDate[Op.lte] = filter.releaseDateUpperBoundary;
    }

    const games = await this.gameModel.findAndCountAll({
      where: { ...query },
      ...pagination,
    });

    return paginate(
      pagination.limit,
      pagination.offset,
      games.count,
      this.gameFactoryService.createNewGames(games.rows),
    );
  }

  async get(id: number) {
    const game = await this.gameModel.findByPk(id);
    return this.gameFactoryService.createNewGame(game);
  }

  async create(item: any) {
    const game = await this.gameModel.create(item);
    return this.gameFactoryService.createNewGame(game);
  }

  async update(id: number, item: any) {
    const game = await this.gameModel.findByPk(id);

    if (!game) return null;

    await game.update(item);
    return this.gameFactoryService.createNewGame(game);
  }

  async delete(id: number) {
    const game = await this.gameModel.findByPk(id);

    if (!game) return false;

    await game.destroy();
    return true;
  }
}
