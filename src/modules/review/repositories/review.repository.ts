import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ReviewWhereFilter } from 'src/common/types/review-types';
import { IReviewRepository } from 'src/core/interfaces/review-repository.interface';
import { ReviewFactoryService } from 'src/common/services/review-factory.service';
import { Review } from 'src/core/entities/review.entity';
import { Review as ReviewModel } from 'src/sequelize/models';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectModel(ReviewModel)
    private reviewModel: typeof ReviewModel,
    private reviewFactoryService: ReviewFactoryService,
  ) {}

  async getAll(where?: ReviewWhereFilter): Promise<Review[]> {
    const reviews = await this.reviewModel.findAll({
      where: {
        ...where,
      },
    });
    return this.reviewFactoryService.createNewReviews(reviews);
  }

  async get(id: number): Promise<Review> {
    const review = await this.reviewModel.findByPk(id);
    return this.reviewFactoryService.createNewReview(review);
  }

  async create(item: any): Promise<Review> {
    const review = await this.reviewModel.create(item);
    return this.reviewFactoryService.createNewReview(review);
  }

  async update(id: number, item: any): Promise<Review> {
    const review = await this.reviewModel.findByPk(id);

    if (!review) return null;

    await review.update(item);
    return this.reviewFactoryService.createNewReview(review);
  }

  async delete(id: number): Promise<boolean> {
    const review = await this.reviewModel.findByPk(id);

    if (!review) return false;

    await review.destroy();
    return true;
  }
}
