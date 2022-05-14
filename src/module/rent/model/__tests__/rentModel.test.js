/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const RentModel = require('../rentModel');

const sequelizeInstance = new Sequelize('sqlite:memory');

test('Despues de hacer un setup a RentModel y sincronizar el modelo, la tabla Rents deberia existir', async () => {
  RentModel.setup(sequelizeInstance);

  await RentModel.sync({ force: true });

  await expect(RentModel.findAll()).resolves.toEqual([]);
});
