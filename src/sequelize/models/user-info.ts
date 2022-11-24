import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
  Length,
  IsDate,
} from 'sequelize-typescript';
import { User } from './user';

@Table
export class UserInfo extends Model {
  @AllowNull(false)
  @Length({ min: 3, max: 20 })
  @Column
  username: string;

  @Column
  description: string;

  @IsDate
  @Column
  dateOfBirth: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
