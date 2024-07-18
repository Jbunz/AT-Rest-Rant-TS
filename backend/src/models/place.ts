'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface PlaceAttributes {
  placeId: number;
  name: string;
  city: string;
  state: string;
  cuisines: string;
  pic: string;
  founded: number;
}

class Place extends Model<PlaceAttributes> implements PlaceAttributes {
  public placeId!: number;
  public name!: string;
  public city!: string;
  public state!: string;
  public cuisines!: string;
  public pic!: string;
  public founded!: number;

  static associate(models: any) {
    Place.hasMany(models.Comment, { foreignKey: 'place_id', as: 'comments' });
  }
}

export const initPlaceModel = (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  Place.init({
    placeId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    cuisines: DataTypes.STRING,
    pic: DataTypes.STRING,
    founded: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Place',
  });

  return Place;
};

export default initPlaceModel;
