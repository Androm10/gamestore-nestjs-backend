import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { factoriesServicesProviders } from './common/providers/factories-services.providers';

import config from './config';
import { ModulesModule } from './modules/modules.module';
import { AppSequelizeModule } from './sequelize/sequelize.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
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
  providers: [...factoriesServicesProviders],
})
export class AppModule {}
