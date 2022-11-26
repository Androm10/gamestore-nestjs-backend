import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IReviewRepository } from 'src/core/interfaces/review-repository.interface';
import { Game, Review } from 'src/sequelize/models';
import { PaginationSequelize } from 'src/common/types/pagination-sequelize.type';
import { paginate } from 'src/common/utils/paginate';
import { FilterReviewQueryDto } from '../dto/filter-review-query.dto';
import { ReviewFactoryService } from 'src/common/modules/factories/services/review-factory.service';
import { Op } from 'sequelize';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
    @InjectModel(Game)
    private gameModel: typeof Game,
    private reviewFactoryService: ReviewFactoryService,
  ) {}

  async getAll(pagination: PaginationSequelize, filter?: FilterReviewQueryDto) {
    const query: any = {};
    if ('userId' in filter) {
      query.userId = filter.userId;
    }

    if ('gameId' in filter) {
      query.gameId = filter.gameId;
    }

    if ('isRecommended' in filter) {
      query.isRecommended = filter.isRecommended;
    }

    if (
      'creationDateLowerBoundary' in filter ||
      'creationDateUpperBoundary' in filter
    ) {
      query.creationDate = {};
    }

    if ('creationDateLowerBoundary' in filter) {
      query.creationDate[Op.gte] = filter.creationDateLowerBoundary;
    }

    if ('creationDateUpperBoundary' in filter) {
      query.creationDate[Op.lte] = filter.creationDateUpperBoundary;
    }

    const reviews = await this.reviewModel.findAndCountAll({
      where: {
        ...query,
      },
      ...pagination,
    });

    return paginate(
      pagination.limit,
      pagination.offset,
      reviews.count,
      this.reviewFactoryService.createNewReviews(reviews.rows),
    );
  }

  async get(id: number) {
    const review = await this.reviewModel.findByPk(id);
    return this.reviewFactoryService.createNewReview(review);
  }

  async create(item: any) {
    const game = await this.gameModel.findByPk(item.gameId);
    if (!game) return null;

    const review = await this.reviewModel.create(item);
    return this.reviewFactoryService.createNewReview(review);
  }

  async update(id: number, item: any) {
    const review = await this.reviewModel.findByPk(id);

    if (!review) return null;

    await review.update(item);
    return this.reviewFactoryService.createNewReview(review);
  }

  async delete(id: number) {
    const review = await this.reviewModel.findByPk(id);

    if (!review) return false;

    await review.destroy();
    return true;
  }
}
