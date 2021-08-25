/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const userIdNotDefinedError = require('../error/userIdNotDefinedError');
const UserController = require('../userController');
const User = require('../../entity/User');

const serviceMock = {
  save: jest.fn(),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new UserController(serviceMock);

test('getAllUsers renderea allusers', async () => {
  const renderMock = jest.fn();
  await controller.getAllUsers({ session: { errors: [], messages: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('user/views/allusers', {
    data: { users: [] },
    errors: [],
    messages: [],
  });
});

test('getAddAUser renderea un from', () => {
  const renderMock = jest.fn();
  controller.getAddAUser({ session: { errors: [] } }, { render: renderMock });

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

test('LLamar a getUserDetails con un id undefined da un error especifico', () => {
  expect(controller.getUserDetails({ params: {} })).rejects.toThrowError(userIdNotDefinedError);
});

test('userSave crea un usuario', async () => {
  const redirectMock = jest.fn();
  await controller.userSave(
    { body: { user: {} }, session: { errors: [], messages: [] } },
    { redirect: redirectMock },
  );

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/admin/users/allusers');
  expect(serviceMock.save).toHaveBeenCalledTimes(1);
});
