/* eslint-disable no-undef */
const { fromModelToEntity } = require('../carMapper');
const { fromDataToEntity } = require('../carMapper');
const CarEntity = require('../../entity/car');

test('Convierte un modelo a una entidad del dominio', () => {
  expect(fromModelToEntity({
    toJSON() {
      return {};
    },
  })).toBeInstanceOf(CarEntity);
});

test('Convierte datos a una entidad del dominio', () => {
  expect(fromDataToEntity({
    toJSON() {
      return {};
    },
  })).toBeInstanceOf(CarEntity);
});
