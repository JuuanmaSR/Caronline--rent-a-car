/* eslint-disable no-undef */
/* eslint-disable no-new */
const AbstractUserController = require('../abstractUserController');
const AbstractUserControllerError = require('../error/abstractUserControllerError');

test('No se puede crear una nueva intancia de un controlador abstracto', () => {
  try {
    new AbstractUserController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractUserControllerError);
  }
});

test('Se puede crear una nueva instancia de una clase hereda de AbstractUserController', async () => {
  const ConcreteController = class extends AbstractUserController {};
  await expect(new ConcreteController()).toBeInstanceOf(AbstractUserController);
});
