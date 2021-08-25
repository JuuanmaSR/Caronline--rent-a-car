/* eslint-disable no-undef */
const UserService = require('../userService');
const userNotDefinedError = require('../error/userNotDefinedError');
const UserIdNotDefinedError = require('../error/userIdNotDefinedError');
const User = require('../../entity/User');
const UserNotDefinedError = require('../error/userNotDefinedError');

const repositoryMock = {
  save: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const service = new UserService(repositoryMock);

test('Guardar un usuario llama al metodo save del repositorio 1 vez', () => {
  service.save({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar save del servicio sin pasar un usuario da un error especifico', async () => {
  await expect(service.save).rejects.toThrowError(UserNotDefinedError);
});

test('Consultar por un usuario llama al metodo getById del repositorio 1 vez', () => {
  service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Consultar por un usuario sin pasar un id da un error especifico', async () => {
  await expect(service.getById).rejects.toThrowError(UserIdNotDefinedError);
});

test('Consultar todo los usuarios llama al metodo getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
