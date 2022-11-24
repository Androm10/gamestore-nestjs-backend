export interface Review {
  id: number;
  userId: number;
  gameId: number;
  isRecommended: boolean;
  text: string;
  creationDate: string;
}
