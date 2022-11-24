import { UserInfoWhereFilter } from 'src/common/types/user-info-types';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { UserInfo } from '../entities/user-info.entity';

export interface IUserInfoRepository extends IGenericRepository<UserInfo> {
  getAll(where?: UserInfoWhereFilter): Promise<UserInfo[]>;
}
