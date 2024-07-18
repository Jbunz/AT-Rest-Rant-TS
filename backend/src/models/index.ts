import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { Sequelize as SequelizeType } from 'sequelize';
import { Model } from 'sequelize/types';

const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
const config: any = require(__dirname + '/../config/config.js')[env];
const db: { [key: string]: Model<any, any> | SequelizeType | typeof Sequelize } = {};

let sequelize: SequelizeType;

if (config.use_env_variable) {
  if (!process.env[config.use_env_variable]) {
    throw new Error(`Environment variable ${config.use_env_variable} is not set`);
  }
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models dynamically
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)).default;
    const modelDef = model(sequelize, DataTypes); // Initialize model with Sequelize instance
    db[modelDef.name] = modelDef;
  });

// Associate models if associations exist
Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    (db[modelName] as any).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
