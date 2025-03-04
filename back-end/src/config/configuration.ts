export const configuration = () => ({
  PORT: parseInt(process.env.PORT!, 10) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'file:./local.db',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
});
