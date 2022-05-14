/* eslint-disable no-undef */
/* eslint-disable no-new */
const AbstractUserController = require('../abstractUserController');
const AbstractUserControllerError = require('../error/abstractUserControllerError');

test('No se puede crear una nueva intancia de un controlador abstracto', () => {
  let controllerInstance;
  try {
    controllerInstance = new AbstractUserController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractUserControllerError);
  } finally {
    expect(controllerInstance).toBeUndefined();
  }
});

test('Se puede crear una nueva instancia de una clase hereda de AbstractUserController', () => {
  const ConcreteController = class extends AbstractUserController {};
  expect(new ConcreteController()).toBeInstanceOf(AbstractUserController);
});
