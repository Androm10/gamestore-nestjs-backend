import { FilterGameQueryDto } from 'src/modules/game/dto/filter-game-query.dto';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { Game } from '../entities/game.entity';
import { Pagination } from '../types/pagination';

export interface IGameRepository extends IGenericRepository<Game> {
  getAll(
    paginationQuery: any,
    filter?: FilterGameQueryDto,
  ): Promise<Pagination<Game>>;
}
