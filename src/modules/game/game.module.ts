import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GAME_REPOSITORY } from 'src/common/constants/tokens';
import { FactoriesModule } from 'src/common/modules/factories/factories.module';
import { Game } from 'src/sequelize/models';
import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game.repository';
import { GameService } from './services/game.service';

@Module({
  controllers: [GameController],
  imports: [SequelizeModule.forFeature([Game]), FactoriesModule],
  providers: [
    GameService,
    { provide: GAME_REPOSITORY, useClass: GameRepository },
  ],
  exports: [GameService],
})
export class GameModule {}
