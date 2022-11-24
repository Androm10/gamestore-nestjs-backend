import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { GAME_REPOSITORY } from 'src/common/constants/tokens';
import { GameWhereFilter } from 'src/common/types/game-types';
import { IGameRepository } from 'src/core/interfaces/game-repository.interface';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @Inject(GAME_REPOSITORY) private gameRepository: IGameRepository,
  ) {}

  async getAll(where?: GameWhereFilter) {
    const games = await this.gameRepository.getAll(where);
    return games;
  }

  async get(id: number) {
    const game = await this.gameRepository.get(id);

    if (!game) throw new NotFoundException('No such game');

    return game;
  }

  async create(dto: CreateGameDto) {
    const game = await this.gameRepository.create(dto);

    if (!game) throw new BadRequestException('Cannot create game');

    return game;
  }

  async update(id: number, userId: number, dto: UpdateGameDto) {
    const game = await this.gameRepository.get(id);

    if (!game) throw new NotFoundException('No such game');

    if (game.authorId !== userId)
      throw new ForbiddenException('Forbidden operation');

    return await this.gameRepository.update(id, dto);
  }

  async delete(id: number, userId: number) {
    const game = await this.gameRepository.get(id);

    if (!game) throw new NotFoundException('No such game');

    if (game.authorId !== userId)
      throw new ForbiddenException('Forbidden operation');

    const result = await this.gameRepository.delete(id);
    return { result };
  }
}
