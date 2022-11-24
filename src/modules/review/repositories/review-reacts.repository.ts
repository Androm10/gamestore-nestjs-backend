import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IReviewReactsRepository } from 'src/core/interfaces/review-reacts-repository.interface';
import { ReviewFunny, ReviewLike } from 'src/sequelize/models';

@Injectable()
export class ReviewReactsRepository implements IReviewReactsRepository {
  constructor(
    @InjectModel(ReviewLike)
    private reviewLikeModel: typeof ReviewLike,
    @InjectModel(ReviewFunny)
    private reviewFunnyModel: typeof ReviewFunny,
  ) {}

  async getLikeCount(reviewId: number): Promise<number> {
    const reviews = await this.reviewLikeModel.findAndCountAll({
      where: { reviewId },
    });

    return reviews.count;
  }

  async getFunnyCount(reviewId: number): Promise<number> {
    const reviews = await this.reviewFunnyModel.findAndCountAll({
      where: { reviewId },
    });

    return reviews.count;
  }

  async getIsLike(reviewId: number, userId: number): Promise<boolean> {
    const like = await this.reviewLikeModel.findOne({
      where: { reviewId, userId },
    });

    return !!like;
  }

  async getIsFunny(reviewId: number, userId: number): Promise<boolean> {
    const funny = await this.reviewFunnyModel.findOne({
      where: { reviewId, userId },
    });

    return !!funny;
  }

  async createLike(reviewId: number, userId: number): Promise<boolean> {
    const like = await this.reviewLikeModel.create({ userId, reviewId });

    if (!like) return false;

    return true;
  }

  async createFunny(reviewId: number, userId: number): Promise<boolean> {
    const funny = await this.reviewFunnyModel.create({ userId, reviewId });

    if (!funny) return false;

    return true;
  }

  async deleteLike(reviewId: number, userId: number): Promise<boolean> {
    const like = await this.reviewLikeModel.findOne({
      where: { userId, reviewId },
    });

    if (!like) return false;

    await like.destroy();
    return true;
  }

  async deleteFunny(reviewId: number, userId: number): Promise<boolean> {
    const funny = await this.reviewFunnyModel.findOne({
      where: { userId, reviewId },
    });

    if (!funny) return false;

    await funny.destroy();
    return true;
  }
}
