import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { ReviewService } from '../services/review.service';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewWhereFilter } from 'src/common/types/review-types';
import { UserRequest } from 'src/common/types/user-request';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @NoAuth()
  @Get('')
  async getAll(@Body() reviewWhereFilter: ReviewWhereFilter) {
    return this.reviewService.getAll(reviewWhereFilter);
  }

  @NoAuth()
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.get(id);
  }

  @NoAuth()
  @Get('game/:gameId')
  async getByGameId(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.reviewService.getAll({ gameId });
  }

  @NoAuth()
  @Get('user/:userId')
  async getByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.reviewService.getAll({ userId });
  }

  @ApiBearerAuth('access-token')
  @Post('')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() request: UserRequest,
  ) {
    createReviewDto.userId = request.user.id;
    return this.reviewService.create(createReviewDto);
  }

  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() request: UserRequest,
  ) {
    return this.reviewService.update(id, request.user.id, updateReviewDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: UserRequest,
  ) {
    return this.reviewService.delete(id, request.user.id);
  }
}
