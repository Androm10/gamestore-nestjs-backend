import { Min } from 'class-validator';
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
  Length,
  Max,
  IsDate,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { User } from './user';
import { UserGame } from './user-game';

@Table
export class Game extends Model {
  @AllowNull(false)
  @Length({ min: 3, max: 30 })
  @Column
  name: string;

  @Column
  description: string;

  @IsDate
  @Column
  releaseDate: string;

  @Min(0)
  @Column(DataType.DOUBLE)
  price: number;

  @Max(1)
  @Min(0)
  @Column(DataType.DOUBLE)
  discount: number;

  @BelongsTo(() => User, 'authorId')
  author: User;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsToMany(() => User, () => UserGame)
  users: User[];
}
