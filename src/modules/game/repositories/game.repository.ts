import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { GameWhereFilter } from 'src/common/types/game-types';
import { IGameRepository } from 'src/core/interfaces/game-repository.interface';
import { Game } from 'src/sequelize/models';
import { GameFactoryService } from 'src/common/services/game-factory.service';

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(
    @InjectModel(Game) private gameModel: typeof Game,
    private gameFactoryService: GameFactoryService,
  ) {}

  async getAll(where?: GameWhereFilter) {
    const games = await this.gameModel.findAll({ where: { ...where } });
    return this.gameFactoryService.createNewGames(games);
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
