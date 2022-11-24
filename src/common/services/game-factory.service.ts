import { Injectable } from '@nestjs/common';

import { Game } from 'src/core/entities/game.entity';

@Injectable({})
export class GameFactoryService {
  createNewGame(obj: any): Game {
    if (!obj) return null;

    return {
      id: obj.id,
      authorId: obj.authorId,
      name: obj.name,
      description: obj.description,
      releaseDate: obj.releaseDate,
      price: obj.price,
      discount: obj.discount,
    };
  }

  createNewGames(array: any[]): Game[] {
    return array.map((game) => this.createNewGame(game));
  }
}
