import { GameWhereFilter } from 'src/common/types/game-types';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { Game } from '../entities/game.entity';

export interface IGameRepository extends IGenericRepository<Game> {
  getAll(where?: GameWhereFilter): Promise<Game[]>;
}
