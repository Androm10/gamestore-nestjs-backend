export interface IReviewReactsRepository {
  getLikeCount(reviewId: number): Promise<number>;
  getFunnyCount(reviewId: number): Promise<number>;

  getIsLike(reviewId: number, userId: number): Promise<boolean>;
  getIsFunny(reviewId: number, userId: number): Promise<boolean>;

  createLike(reviewId: number, userId: number): Promise<boolean>;
  createFunny(reviewId: number, userId: number): Promise<boolean>;

  deleteLike(reviewId: number, userId: number): Promise<boolean>;
  deleteFunny(reviewId: number, userId: number): Promise<boolean>;
}
