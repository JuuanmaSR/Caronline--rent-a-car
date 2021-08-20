/* eslint-disable class-methods-use-this */
const AbstractCarRepositoryError = require('./error/abstractCarRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new AbstractCarRepositoryError(
        'No se puede instanciar el repositorio de autos abstracto.',
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
