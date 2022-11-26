import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserInfoService } from './services/user-info.service';
import { UserInfoRepository } from './repositories/user-info.repository';
import { UserInfoController } from './controllers/user-info.controller';

import {
  USER_REPOSITORY,
  USER_INFO_REPOSITORY,
} from 'src/common/constants/tokens';

import { Role, User, UserInfo } from 'src/sequelize/models';
import { FactoriesModule } from 'src/common/modules/factories/factories.module';

@Module({
  controllers: [UserController, UserInfoController],
  imports: [
    SequelizeModule.forFeature([User, UserInfo, Role]),
    FactoriesModule,
  ],
  providers: [
    UserService,
    UserInfoService,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: USER_INFO_REPOSITORY, useClass: UserInfoRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
