const AbstractUserControllerError = require('./error/abstractUserControllerError');

module.exports = class AbstractUserController {
  constructor() {
    if (new.target === AbstractUserController) {
      throw new AbstractUserControllerError(
        'No se puede instanciar al controlador de usarios abstractp',
      );
    }
  }
};
