export const database = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3307,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '1111',
  database: process.env.DB_NAME || 'gamestore',
};
