import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

import { Review } from './review';
import { User } from './user';

@Table
export class ReviewLike extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Review)
  @Column
  reviewId: number;
}
