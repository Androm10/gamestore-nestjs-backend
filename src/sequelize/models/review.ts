import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
  IsDate,
} from 'sequelize-typescript';
import { Game } from './game';
import { User } from './user';

@Table
export class Review extends Model {
  @AllowNull(false)
  @Column
  isRecommended: boolean;

  @Column
  text: string;

  @IsDate
  @Column
  creationDate: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ForeignKey(() => Game)
  @Column
  gameId: number;

  @BelongsTo(() => Game, {
    onDelete: 'CASCADE',
  })
  game: Game;
}
