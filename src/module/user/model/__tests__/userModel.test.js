/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const UserModel = require('../userModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

test('Despues de hacerle un setup a UserModel  y sincronizar el modelo, la tabla Users deberia existir', async () => {
  UserModel.setup(sequelizeInstance);

  await UserModel.sync({ force: true });

  expect(await UserModel.findAll()).toEqual([]);
});
