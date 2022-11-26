import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UserFactoryService {
  createNewUser(obj: any): User {
    if (!obj) return null;

    return {
      id: obj.id,
      login: obj.login,
      password: obj.password,
    };
  }

  createNewUsers(array: any[]): User[] {
    return array.map((user) => this.createNewUser(user));
  }
}
