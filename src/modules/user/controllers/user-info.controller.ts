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

import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { UserInfoService } from '../services/user-info.service';
import { CreateUserInfoDto } from '../dto/create-user-info.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';
import { Roles } from 'src/common/decorators/check-roles.decorator';
import { UserRequest } from 'src/common/types/user-request';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FilterUserInfoQueryDto } from '../dto/filter-user-info-query.dto';

@ApiTags('user info')
@Controller('userinfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @NoAuth()
  @Get('')
  async getAll(
    @Query() pagination: PaginationQueryDto,
    @Query() filter: FilterUserInfoQueryDto,
  ) {
    return this.userInfoService.getAll(pagination, filter);
  }

  @NoAuth()
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.userInfoService.get(id);
  }

  @ApiBearerAuth('access-token')
  @Post('')
  async create(@Body() createUserDto: CreateUserInfoDto) {
    return this.userInfoService.create(createUserDto);
  }

  @ApiBearerAuth('access-token')
  @Put('update-profile')
  async updateProffile(
    @Request() request: UserRequest,
    @Body() updateUserDto: UpdateUserInfoDto,
  ) {
    return this.userInfoService.update(request.user.id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserInfoDto,
  ) {
    return this.userInfoService.update(id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('Admin')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userInfoService.delete(id);
  }
}
