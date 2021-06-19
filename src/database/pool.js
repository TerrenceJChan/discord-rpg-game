import pg from 'pg';
import {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} from '../env';

let pool;

export const getPool = () => {
  if (!pool) {
    pool = new pg.Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
  }
  return pool;
};

export const end = () => {
  pool?.end();
  pool = undefined;
};
