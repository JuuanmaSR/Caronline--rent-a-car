/* eslint-disable class-methods-use-this */
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractRentRepository {
  constructor() {
    if (new.target === AbstractRentRepository) {
      throw new AbstractRentRepository(
        'No se puede instanciar el repositorio de rentas abstracto.',
      );
    }
  }

  async save() {
    throw new MethodNotImplementedError();
  }

  async delete() {
    throw new MethodNotImplementedError();
  }

  async getById() {
    throw new MethodNotImplementedError();
  }

  async getAll() {
    throw new MethodNotImplementedError();
  }
};
