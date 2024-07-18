'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface CommentAttributes {
  commentId: number;
  content: string;
  placeId: number;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public commentId!: number;
  public content!: string;
  public placeId!: number;

  static associate(models: any) {
    Comment.belongsTo(models.Place, { foreignKey: 'place_id', as: 'place' });
  }
}

export const initCommentModel = (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: DataTypes.STRING,
    placeId: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Comment',
  });

  return Comment;
};

export { Comment, CommentAttributes };
