/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const UserModel = require('../../model/userModel');
const UserRepository = require('../userRepository');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const createTestUser = require('../../controller/__tests__/createTestUserSample.fixture');

const sequelizeInstance = new Sequelize('sqlite::memory');

/**
 * @type UserRepository
 */
let repository;

beforeAll(() => {
  const user = UserModel.setup(sequelizeInstance);
  repository = new UserRepository(user);
});

beforeEach(async () => {
  await sequelizeInstance.sync({ force: true });
});

test('Crea un usuario cuando la entidad no tiene id', async () => {
  const userWithoutId = createTestUser();
  const newUser = await repository.save(userWithoutId);
  expect(newUser.id).toEqual(1);
});

test('Llamar a save sin parametros  devuelve un error especifico', async () => {
  await expect(repository.save()).rejects.toThrowError(UserNotDefinedError);
  await expect(repository.save()).rejects.toThrowError('On userRepository(save) the user is undefined');
});

test('Llamar a getById  sin parametros devuelve un error especifico', async () => {
  await expect(repository.getById()).rejects.toThrowError(UserIdNotDefinedError);
});

test('Llamar a delete sin parametros devuelve un error especifico', async () => {
  await expect(repository.delete()).rejects.toThrowError(UserNotDefinedError);
});
test('Llamar a delete arroja un error cuando los parametros no poseen un ID', async () => {
  const userWithoutId = createTestUser();
  await expect(repository.delete(userWithoutId)).rejects.toThrowError(UserIdNotDefinedError);
});
test('Llamar a delete con parametros correcto devuelve true', async () => {
  const userWithoutId = createTestUser();
  const newUser = await repository.save(userWithoutId);
  await expect(repository.delete(newUser)).toBeTruthy();
});
