import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, ReviewModule, GameModule],
  exports: [UserModule, AuthModule, ReviewModule, GameModule],
})
export class ModulesModule {}
