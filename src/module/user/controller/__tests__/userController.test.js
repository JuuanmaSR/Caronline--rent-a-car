/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const UserController = require('../userController');
const User = require('../../entity/User');
const UserNotDefinedError = require('../../error/UserNotDefinedError');

const serviceMock = {
  save: jest.fn(),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new UserController(serviceMock);

test('getAllUsers renderea allusers', async () => {
  const renderMock = jest.fn();
  const nextMock = jest.fn();
  await controller.getAllUsers({ session: { errors: [], messages: [] } }, { render: renderMock }, { next: nextMock });
  expect(nextMock).toHaveBeenCalledTimes(0);
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('user/views/allusers', {
    data: { users: [] },
    errors: [],
    messages: [],
  });
});

test('getAddAUser renderea un from', async () => {
  const renderMock = jest.fn();
  await controller.getAddAUser({ session: { errors: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('user/views/form');
});

test('getUserDetails rendera un usuario con id especifico', async () => {
  const renderMock = jest.fn();
  const id = 1;
  await controller.getUserDetails({ params: { id }, session: { errors: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('user/views/details', {
    data: { user: {} },
  });
});

test('LLamar a getUserDetails con un id undefined da un error especifico', async () => {
  const nextMock = jest.fn();
  await expect(controller.getUserDetails({ params: {} })).rejects.toThrowError(nextMock());
});

test('userSave da un error especifico si se pasa un body vacio', async () => {
  const nextMock = jest.fn();
  const redirectMock = jest.fn();
  await expect(controller.userSave(
    { body: { user: {} }, session: { errors: [], messages: [] } },
    { redirect: redirectMock },
  )).rejects.toThrowError(nextMock());

  expect(nextMock).toHaveBeenCalledTimes(1);
});
