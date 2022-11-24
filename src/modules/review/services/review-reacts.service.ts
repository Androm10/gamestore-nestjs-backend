import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import {
  REVIEW_REACTS_REPOSITORY,
  REVIEW_REPOSITORY,
} from 'src/common/constants/tokens';
import { IReviewReactsRepository } from 'src/core/interfaces/review-reacts-repository.interface';
import { IReviewRepository } from 'src/core/interfaces/review-repository.interface';

@Injectable()
export class ReviewReactsService {
  constructor(
    @Inject(REVIEW_REACTS_REPOSITORY)
    private reviewReactsRepository: IReviewReactsRepository,
    @Inject(REVIEW_REPOSITORY)
    private reviewRepository: IReviewRepository,
  ) {}

  async getLikeCount(reviewId: number) {
    const result = await this.reviewReactsRepository.getLikeCount(reviewId);
    return { result };
  }

  async getFunnyCount(reviewId: number) {
    const result = await this.reviewReactsRepository.getFunnyCount(reviewId);
    return { result };
  }

  async getIsLike(reviewId: number, userId: number) {
    const result = await this.reviewReactsRepository.getIsLike(
      reviewId,
      userId,
    );
    return { result };
  }

  async getIsFunny(reviewId: number, userId: number) {
    const result = await this.reviewReactsRepository.getIsFunny(
      reviewId,
      userId,
    );
    return { result };
  }

  async createLike(reviewId: number, userId: number) {
    const review = await this.reviewRepository.get(reviewId);

    if (!review) throw new NotFoundException('No such review');

    const result = await this.reviewReactsRepository.createLike(
      reviewId,
      userId,
    );
    return { result };
  }

  async createFunny(reviewId: number, userId: number) {
    const review = await this.reviewRepository.get(reviewId);

    if (!review) throw new NotFoundException('No such review');

    const result = await this.reviewReactsRepository.createFunny(
      reviewId,
      userId,
    );
    return { result };
  }

  async deleteLike(reviewId: number, userId: number) {
    const result = await this.reviewReactsRepository.deleteLike(
      reviewId,
      userId,
    );
    return { result };
  }

  async deleteFunny(reviewId: number, userId: number) {
    const result = await this.reviewReactsRepository.deleteFunny(
      reviewId,
      userId,
    );
    return { result };
  }
}
