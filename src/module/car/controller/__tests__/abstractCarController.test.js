/* eslint-disable no-undef */
/* eslint-disable no-new */
const AbstractCarController = require('../abstractCarController');
const AbstractCarControllerError = require('../error/abstractCarControllerError');

test('No se puede crear una nueva instancia de un AbstractCarController directamente', () => {
  try {
    new AbstractCarController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractCarControllerError);
  }
});

test('Se puede crear una nueva instancia de una clase que hereda de AbstractCarController', async () => {
  const ConcreteController = class extends AbstractCarController {};
  await expect(new ConcreteController()).toBeInstanceOf(AbstractCarController);
});
