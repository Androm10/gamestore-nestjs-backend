import {
  Column,
  Model,
  Table,
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  HasOne,
  AllowNull,
  IsEmail,
  Unique,
} from 'sequelize-typescript';

import { hashPasword as hash } from 'src/common/utils/bcrypt';
import { Game } from './game';

import { Role } from './role';
import { UserGame } from './user-game';
import { UserInfo } from './user-info';
import { UserRole } from './user-role';

@Table
export class User extends Model {
  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  login: string;

  @AllowNull(false)
  @Column
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasOne(() => UserInfo)
  userInfo: UserInfo;

  @BelongsToMany(() => Game, () => UserGame)
  games: Game[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password);
  }
}
