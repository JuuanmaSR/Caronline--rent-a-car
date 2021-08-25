/* eslint-disable no-undef */
const { fromDataToEntity, fromModelToEntity } = require('../userMapper');
const User = require('../../entity/User');

test('Convierte un modelo a una entidad del dominio', () => {
  expect(fromModelToEntity({
    toJSON() {
      return {};
    },
  })).toBeInstanceOf(User);
});

test('Convierte datos a una entidad del dominio', () => {
  expect(fromDataToEntity({
    toJSON() {
      return {};
    },
  })).toBeInstanceOf(User);
});
