import { Module } from '@nestjs/common';

import {
  REVIEW_REACTS_REPOSITORY,
  REVIEW_REPOSITORY,
} from 'src/common/constants/tokens';
import { ReviewController } from './controllers/review.controller';
import { ReviewReactsController } from './controllers/review-reacts.controller';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewReactsRepository } from './repositories/review-reacts.repository';
import { ReviewReactsService } from './services/review-reacts.service';
import { ReviewService } from './services/review.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review, ReviewFunny, ReviewLike } from 'src/sequelize/models';

@Module({
  controllers: [ReviewController, ReviewReactsController],
  imports: [SequelizeModule.forFeature([Review, ReviewLike, ReviewFunny])],
  providers: [
    ReviewService,
    ReviewReactsService,
    { provide: REVIEW_REPOSITORY, useClass: ReviewRepository },
    { provide: REVIEW_REACTS_REPOSITORY, useClass: ReviewReactsRepository },
  ],
  exports: [ReviewService, ReviewReactsService],
})
export class ReviewModule {}
