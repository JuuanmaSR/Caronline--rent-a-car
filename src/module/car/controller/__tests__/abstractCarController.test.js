/* eslint-disable no-undef */
/* eslint-disable no-new */
const AbstractCarController = require('../abstractCarController');
const AbstractCarControllerError = require('../error/abstractCarControllerError');

test('No se puede crear una nueva instancia de un AbstractCarController directamente', () => {
  let controllerInstance;
  try {
    controllerInstance = new AbstractCarController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractCarControllerError);
  } finally {
    expect(controllerInstance).toBeUndefined();
  }
});

test('Se puede crear una nueva instancia de una clase que hereda de AbstractCarController', () => {
  const ConcreteController = class extends AbstractCarController {};
  expect(new ConcreteController()).toBeInstanceOf(AbstractCarController);
});
