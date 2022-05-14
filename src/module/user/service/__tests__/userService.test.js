/* eslint-disable no-undef */
const UserService = require('../userService');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const createTestUser = require('../../controller/__tests__/createTestUserSample.fixture');
/**
 * @type {import('../../repository/userRepository')} User Repository
 */
let repositoryMock;
/**
 * @type {import('../userService')} User Service
 */
let userService;
describe('User service methods', () => {
  beforeEach(() => {
    repositoryMock = {
      save: jest.fn(),
      delete: jest.fn(() => Promise.resolve(true)),
      getById: jest.fn(),
      getAll: jest.fn(),
    };
    userService = new UserService(repositoryMock);
  });

  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('El servicio a través del metodo save llama al repositorio para guardar un usuario en la DB', async () => {
    const user = createTestUser(1);
    await userService.save(user);

    expect(user.id).toEqual(1);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(user);
  });

  test('El servicio a través del metodo save llama al repositorio para guardar un usuario en la DB, pero este arroja un error ya que el usuario no es una instancia de la clase User', async () => {
    const user = { id: 1, name: 'juan', surname: 'fernández' };
    await expect(userService.save(user)).rejects.toThrowError(UserNotDefinedError);
  });

  test('El servicio a través del metodo delete llama al repositorio para eliminar un usuario especifico de la DB', async () => {
    const user = createTestUser(1);
    const userIsDeleted = await userService.delete(user);
    expect(userIsDeleted).toBeTruthy();
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(user);
  });

  test('El servicio a través del metodo delete llama al repositorio para eliminar un usuario especifico de la DB pero este arroja un error ya que el usuario no es una instancia de la clase User', async () => {
    const user = { id: 1, name: 'juan', surname: 'fernández' };
    await expect(userService.delete(user)).rejects.toThrowError(UserNotDefinedError);
  });

  test('El servicio a través del metodo delete llama al repositorio para eliminar un usuario especifico de la DB pero este arroja un error ya que el usuario no posee un id', async () => {
    const user = createTestUser();
    await expect(userService.delete(user)).rejects.toThrowError(UserIdNotDefinedError);
  });

  test('El servicio a través del metodo getById llama al repositorio para obtener un usuario especifico', async () => {
    const user = createTestUser(1);
    await userService.getById(user.id);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(user.id);
  });

  test('El servicio a través del metodo getById llama al repositorio para obtener un usuario especifico pero este arroja un error ya que el parametro es incorrecto', async () => {
    const user = createTestUser();
    await expect(userService.getById(user.id)).rejects.toThrowError(UserIdNotDefinedError);
  });

  test('El servicio a travez del metodo getAll llama al repositorio para obtener todo los usuarios de la DB', async () => {
    await userService.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});
