import { ReviewWhereFilter } from 'src/common/types/review-types';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { Review } from '../entities/review.entity';

//TODO: get it off
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReviewRepository extends IGenericRepository<Review> {
  getAll(where?: ReviewWhereFilter): Promise<Review[]>;
}
