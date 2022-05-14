/* eslint-disable no-undef */
const Rent = require('../../entity/Rent');
const { fromDataToEntity, fromModelToEntity } = require('../rentMapper');

test('Convierte datos a una entidad del dominio', () => {
  expect(fromDataToEntity({
    toJSON() {
      return {};
    },
  })).toBeInstanceOf(Rent);
});

test('Convierte un modelo a una entidad del dominio', () => {
  expect(fromModelToEntity({
    toJSON() {
      return {};
    },
  })).toBeInstanceOf(Rent);
});
