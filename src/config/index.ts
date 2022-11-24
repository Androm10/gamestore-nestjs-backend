import * as databaseConfig from './sequelize.config';
import * as authConfig from './auth.config';
import * as throttlerConfig from './throttler.config';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  ...databaseConfig,
  ...authConfig,
  ...throttlerConfig,
});
