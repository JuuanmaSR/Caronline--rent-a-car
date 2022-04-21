/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable strict */

'use strict';

const { CarModel } = require('../../src/module/car/module');
const { RentModel } = require('../../src/module/rent/module');
const { UserModel } = require('../../src/module/user/module');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    CarModel.setup(queryInterface.sequelize).sync({ force: true });
    UserModel.setup(queryInterface.sequelize).sync({ force: true });
    RentModel.setup(queryInterface.sequelize).setupAssociations(CarModel, UserModel).sync({ force: true });
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('rents');
  },
};
