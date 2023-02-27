import { config } from 'dotenv';
config();

export const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOSTNAME,
  DB_PORT,
  DATABASE_URL,
  PORT,
  NODE_ENV,
  APP_SECRET
} = process.env as Record<string, string>;

