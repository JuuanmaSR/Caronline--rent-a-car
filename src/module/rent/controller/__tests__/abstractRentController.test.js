/* eslint-disable no-undef */
const AbstractRentController = require('../abstractRentController');
const AbstractRentControllerError = require('../error/abstractRentControllerError');

test('No se puede instanciar un controlador abstracto', () => {
  let controllerInstance;
  try {
    controllerInstance = new AbstractRentController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractRentControllerError);
  } finally {
    expect(controllerInstance).toBeUndefined();
  }
});

test('Se puede instanciar un controlador concreto que herede de un controlador abstracto', () => {
  const ConcreteController = class extends AbstractRentController {};
  const controllerInstance = new ConcreteController();
  expect(controllerInstance).toBeInstanceOf(AbstractRentController);
  expect(controllerInstance).toBeInstanceOf(ConcreteController);
});
