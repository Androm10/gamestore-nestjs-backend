import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { ReviewReactsService } from '../services/review-reacts.service';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { UserRequest } from 'src/common/types/user-request';

@ApiTags('review')
@Controller('review-reacts')
export class ReviewReactsController {
  constructor(private readonly reviewReactsService: ReviewReactsService) {}

  @NoAuth()
  @Get(':reviewId/like-count')
  async getLikeCount(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewReactsService.getLikeCount(reviewId);
  }

  @NoAuth()
  @Get(':reviewId/funny-count')
  async getFunnyCount(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewReactsService.getFunnyCount(reviewId);
  }

  @ApiBearerAuth('access-token')
  @Get(':reviewId/like')
  async getIsLiked(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewReactsService.getIsLike(reviewId, request.user.id);
  }

  @ApiBearerAuth('access-token')
  @Get(':reviewId/funny')
  async getIsFunny(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewReactsService.getIsFunny(reviewId, request.user.id);
  }

  @ApiBearerAuth('access-token')
  @Post(':reviewId/like')
  async createLike(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewReactsService.createLike(reviewId, request.user.id);
  }

  @ApiBearerAuth('access-token')
  @Post(':reviewId/funny')
  async createFunny(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewReactsService.createFunny(reviewId, request.user.id);
  }

  @ApiBearerAuth('access-token')
  @Delete(':reviewId/like')
  async deleteLike(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewReactsService.deleteLike(reviewId, request.user.id);
  }

  @ApiBearerAuth('access-token')
  @Delete(':reviewId/funny')
  async deleteFunny(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewReactsService.deleteFunny(reviewId, request.user.id);
  }
}
