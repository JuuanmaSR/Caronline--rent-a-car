const AbstractCarControllerError = require('./error/abstractCarControllerError');

module.exports = class AbstractCarController {
  constructor() {
    if (new.target === AbstractCarController) {
      throw new AbstractCarControllerError(
        'No se puede instanciar el controlador de autos abstracto.',
      );
    }
  }
};
