import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

import { Role } from './role';
import { User } from './user';

@Table
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;
}
