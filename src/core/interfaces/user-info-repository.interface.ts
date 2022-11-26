import { FilterUserInfoQueryDto } from 'src/modules/user/dto/filter-user-info-query.dto';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { UserInfo } from '../entities/user-info.entity';
import { Pagination } from '../types/pagination';

export interface IUserInfoRepository extends IGenericRepository<UserInfo> {
  getAll(
    paginationQuery: any,
    filter?: FilterUserInfoQueryDto,
  ): Promise<Pagination<UserInfo>>;
}
