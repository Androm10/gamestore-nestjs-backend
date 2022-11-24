import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

import { Game } from './game';
import { User } from './user';

@Table
export class UserGame extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Game)
  @Column
  gameId: number;
}
