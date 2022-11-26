import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Request,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UserRequest } from 'src/common/types/user-request';
import { CreateGameDto } from '../dto/create-game.dto';
import { FilterGameQueryDto } from '../dto/filter-game-query.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
import { GameService } from '../services/game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @NoAuth()
  @Get('')
  async getAll(
    @Query() pagination: PaginationQueryDto,
    @Query() filter: FilterGameQueryDto,
  ) {
    return this.gameService.getAll(pagination, filter);
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.get(id);
  }

  @ApiBearerAuth('access-token')
  @Post('')
  async create(
    @Body() createUserDto: CreateGameDto,
    @Request() request: UserRequest,
  ) {
    createUserDto.authorId = request.user.id;
    return this.gameService.create(createUserDto);
  }

  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateGameDto,
    @Request() request: UserRequest,
  ) {
    return this.gameService.update(id, request?.user.id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: UserRequest,
  ) {
    return this.gameService.delete(id, request?.user.id);
  }
}
