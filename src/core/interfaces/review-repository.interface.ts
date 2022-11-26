import { FilterReviewQueryDto } from 'src/modules/review/dto/filter-review-query.dto';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { Review } from '../entities/review.entity';
import { Pagination } from '../types/pagination';

export interface IReviewRepository extends IGenericRepository<Review> {
  getAll(
    paginationQuery: any,
    filter?: FilterReviewQueryDto,
  ): Promise<Pagination<Review>>;
}
