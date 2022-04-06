const AbstractRentControllerError = require('./error/abstractRentControllerError');

module.exports = class AbstractRentController {
  constructor() {
    if (new.target === AbstractRentController) {
      throw new AbstractRentControllerError(
        'No se puede instanciar el controlador de rentas abstracto',
      );
    }
  }
};
