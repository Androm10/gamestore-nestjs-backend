import { SetMetadata } from '@nestjs/common';

import { ROLES } from '../constants/metatags';

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);
