import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import config from './config';
import auth from './config/auth.config';
import database from './config/sequelize.config';
import throttler from './config/throttler.config';
import { ModulesModule } from './modules/modules.module';
import { AppSequelizeModule } from './sequelize/sequelize.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config, auth, database, throttler],
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        limit: configService.get('throttler.limit'),
        ttl: configService.get('throttler.ttl'),
      }),
      inject: [ConfigService],
    }),
    ModulesModule,
    AppSequelizeModule,
  ],
})
export class AppModule {}
