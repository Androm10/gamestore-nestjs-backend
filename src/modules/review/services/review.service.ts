import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { REVIEW_REPOSITORY } from 'src/common/constants/tokens';
import { ReviewWhereFilter } from 'src/common/types/review-types';
import { IReviewRepository } from 'src/core/interfaces/review-repository.interface';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY) private reviewRepository: IReviewRepository,
  ) {}

  async getAll(where?: ReviewWhereFilter) {
    const reviews = await this.reviewRepository.getAll(where);
    return reviews;
  }

  async get(id: number) {
    const review = await this.reviewRepository.get(id);

    if (!review) throw new NotFoundException('No such review');

    return review;
  }

  //TODO: add date
  async create(dto: CreateReviewDto) {
    const review = await this.reviewRepository.create(dto);

    if (!review) throw new BadRequestException('Cannot create review');

    return review;
  }

  async update(id: number, userId: number, dto: UpdateReviewDto) {
    const review = await this.reviewRepository.get(id);

    if (!review) throw new NotFoundException('No such review');

    if (userId !== review.userId) {
      throw new ForbiddenException('Forbidden operation');
    }

    await this.reviewRepository.update(id, dto);
    return review;
  }

  async delete(id: number, userId: number) {
    const review = await this.reviewRepository.get(id);

    if (!review) throw new NotFoundException('No such review');

    if (userId !== review.userId) {
      throw new ForbiddenException('Forbidden operation');
    }

    const result = await this.reviewRepository.delete(id);

    return { result };
  }
}
