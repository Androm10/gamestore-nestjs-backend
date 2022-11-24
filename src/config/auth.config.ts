export const auth = {
  secret: process.env.AUTH_SECRET || 'secret',
  expiresIn: process.env.AUTH_EXPIRES || '1h',
};
