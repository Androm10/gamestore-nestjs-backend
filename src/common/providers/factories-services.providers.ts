import { Provider } from '@nestjs/common';

import { GameFactoryService } from '../services/game-factory.service';
import { ReviewFactoryService } from '../services/review-factory.service';
import { UserFactoryService } from '../services/user-factory.service';
import { UserInfoFactoryService } from '../services/user-info-factory.service';

export const factoriesServicesProviders: Provider[] = [
  UserFactoryService,
  UserInfoFactoryService,
  GameFactoryService,
  ReviewFactoryService,
];
