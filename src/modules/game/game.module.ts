import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GAME_REPOSITORY } from 'src/common/constants/tokens';
import { Game } from 'src/sequelize/models';
import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game.repository';
import { GameService } from './services/game.service';

@Module({
  controllers: [GameController],
  imports: [SequelizeModule.forFeature([Game])],
  providers: [
    GameService,
    { provide: GAME_REPOSITORY, useClass: GameRepository },
  ],
  exports: [GameService],
})
export class GameModule {}
