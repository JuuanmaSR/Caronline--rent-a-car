/* eslint-disable class-methods-use-this */
const AbstractUserRepositoryError = require('./error/abstractUserRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractUserRepository {
  constructor() {
    if (new.target === AbstractUserRepository) {
      throw new AbstractUserRepositoryError(
        'No se puede instanciar el repositorio de usarios abstractos',
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
