/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
const AbstractCarRepository = require('../abstractCarRepository');
const AbstractErrorCarRepository = require('../error/abstractCarRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede instanciar un repositorio abstracto', () => {
  let repositoryInstance;
  try {
    repositoryInstance = new AbstractCarRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractErrorCarRepository);
  } finally {
    expect(repositoryInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const repositoryInstance = new ConcreteRepository();
  expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(repositoryInstance).toBeInstanceOf(AbstractCarRepository);
});

test('Llamar a los metodos base sin implementacion concreta da error', async () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const repositoryInstance = new ConcreteRepository();

  await expect(() => repositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
  await expect(() => repositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
  await expect(() => repositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
  await expect(() => repositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
});
