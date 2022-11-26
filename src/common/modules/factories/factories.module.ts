import { Module } from '@nestjs/common';
import { GameFactoryService } from './services/game-factory.service';
import { ReviewFactoryService } from './services/review-factory.service';
import { UserFactoryService } from './services/user-factory.service';
import { UserInfoFactoryService } from './services/user-info-factory.service';

@Module({
  providers: [
    UserFactoryService,
    UserInfoFactoryService,
    ReviewFactoryService,
    GameFactoryService,
  ],
  exports: [
    UserFactoryService,
    UserInfoFactoryService,
    ReviewFactoryService,
    GameFactoryService,
  ],
})
export class FactoriesModule {}
