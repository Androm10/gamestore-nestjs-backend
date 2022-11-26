import { Injectable } from '@nestjs/common';
import { Review } from 'src/core/entities/review.entity';

@Injectable()
export class ReviewFactoryService {
  createNewReview(obj: any): Review {
    if (!obj) return null;

    return {
      id: obj.id,
      userId: obj.userId,
      gameId: obj.gameId,
      isRecommended: obj.isRecommended,
      text: obj.text,
      creationDate: obj.creationDate,
    };
  }

  createNewReviews(array: any[]): Review[] {
    return array.map((review) => this.createNewReview(review));
  }
}
