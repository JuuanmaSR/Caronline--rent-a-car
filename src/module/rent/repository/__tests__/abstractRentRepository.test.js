/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
const AbstractRentRepository = require('../abstractRentRepository');
const AbstractRentRepositoryError = require('../error/abstractRentRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede instanciar un repositorio abstracto', () => {
  let repositoryInstance;
  try {
    repositoryInstance = new AbstractRentRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractRentRepositoryError);
  } finally {
    expect(repositoryInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede de un repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractRentRepository {};
  const repositoryInstance = new ConcreteRepository();
  expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(repositoryInstance).toBeInstanceOf(AbstractRentRepository);
});

test('Llamar a los metodos base sin implementacion concreta da error', () => {
  const ConcreteRepository = class extends AbstractRentRepository {};
  const repositoryInstance = new ConcreteRepository();

  expect(repositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(repositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(repositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
  expect(repositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
});
