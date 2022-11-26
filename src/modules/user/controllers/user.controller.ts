import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { Roles } from 'src/common/decorators/check-roles.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UserRequest } from 'src/common/types/user-request';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Get('')
  async getAll(@Query() pagination: PaginationQueryDto) {
    return this.userService.getAll(pagination);
  }

  @NoAuth()
  @Post('get-by-login')
  async getByLogin(@Body('login') login: string) {
    return this.userService.getByLogin(login);
  }

  @ApiBearerAuth('access-token')
  @Get('game-collection')
  async getMyGameCollection(
    @Query() pagination: PaginationQueryDto,
    @Request() request: UserRequest,
  ) {
    return this.userService.getGameCollection(pagination, request.user.id);
  }

  @NoAuth()
  @Get(':id/game-collection')
  async getGameCollection(
    @Query() pagination: PaginationQueryDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.getGameCollection(pagination, userId);
  }

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.get(id);
  }

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
