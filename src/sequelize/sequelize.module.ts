import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  Game,
  Review,
  ReviewFunny,
  ReviewLike,
  Role,
  User,
  UserGame,
  UserInfo,
  UserRole,
} from './models';
import { SEQUELIZE } from 'src/common/constants/tokens';
import { sequelizeProviders } from './providers';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        models: [
          User,
          Role,
          UserInfo,
          UserRole,
          Game,
          UserGame,
          Review,
          ReviewLike,
          ReviewFunny,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...sequelizeProviders],
  exports: [SequelizeModule, SEQUELIZE],
})
export class AppSequelizeModule {}
