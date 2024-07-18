'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  userId: number;
  username: string;
  email: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public userId!: number;
  public username!: string;
  public email!: string;

  static associate(models: any) {
    User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
  }
}

export const initUserModel = (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
  });

  return User;
};

export { User, UserAttributes };
