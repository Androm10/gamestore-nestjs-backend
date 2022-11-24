import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/core/entities/user-info.entity';

@Injectable()
export class UserInfoFactoryService {
  createNewUserInfo(obj: any): UserInfo {
    if (!obj) return null;

    return {
      id: obj.id,
      userId: obj.userId,
      username: obj.username,
      description: obj?.description,
      dateOfBirth: obj?.dateOfBirth,
    };
  }

  createNewUserInfos(array: any[]): UserInfo[] {
    return array.map((userInfo) => this.createNewUserInfo(userInfo));
  }
}
