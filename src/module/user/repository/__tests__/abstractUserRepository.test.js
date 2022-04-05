/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
const AbstractUserRepository = require('../abstractUserRepository');
const AbstractUserRepositoryError = require('../error/abstractUserRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede intanciar un repositorio abstracto', () => {
  let repositoryInstance;
  try {
    repositoryInstance = new AbstractUserRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractUserRepositoryError);
  } finally {
    expect(repositoryInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', async () => {
  const ConcreteRepository = class extends AbstractUserRepository {};
  const repositoryInstance = new ConcreteRepository();
  await expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
  await expect(repositoryInstance).toBeInstanceOf(AbstractUserRepository);
});

test('Llamar a los metodos base sin implementacion concreta da error', async () => {
  const ConcreteRepository = class extends AbstractUserRepository {};
  const repositoryInstance = new ConcreteRepository();

  await expect(() => repositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
  await expect(() => repositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
  await expect(() => repositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  await expect(() => repositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
});
