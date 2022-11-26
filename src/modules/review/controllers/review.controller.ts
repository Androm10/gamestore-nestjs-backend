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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { ReviewService } from '../services/review.service';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { UserRequest } from 'src/common/types/user-request';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FilterReviewQueryDto } from '../dto/filter-review-query.dto';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @NoAuth()
  @Get('')
  async getAll(
    @Query() pagination: PaginationQueryDto,
    @Query() filter: FilterReviewQueryDto,
  ) {
    return this.reviewService.getAll(pagination, filter);
  }

  @NoAuth()
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.get(id);
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
