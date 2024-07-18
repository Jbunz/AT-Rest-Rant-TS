import { config } from 'dotenv';
import { Dialect } from 'sequelize';

config();

interface DbConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: Dialect;
}

interface Config {
  development: DbConfig;
  test: DbConfig;
  production: DbConfig;
}

const dbConfig: Config = {
  development: {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || '',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

export default dbConfig;
