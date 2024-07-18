'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.addColumn('users', 'password_digest', {
      type: Sequelize.DataTypes.STRING
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.removeColumn('users', 'password_digest');
  }
};
