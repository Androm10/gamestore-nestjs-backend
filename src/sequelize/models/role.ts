import {
  Column,
  Model,
  Table,
  BelongsToMany,
  AllowNull,
} from 'sequelize-typescript';

import { User } from './user';
import { UserRole } from './user-role';

@Table
export class Role extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
