/* eslint-disable no-undef */
const CarService = require('../carService');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const createTestCar = require('../../controller/__tests__/createTestCarSample.fixture');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),

};

const carService = new CarService(repositoryMock);

test('Guardar un vehiculo llama al metodo save del repositorio 1 vez', async () => {
  const carWithoutId = createTestCar();
  await carService.save(carWithoutId);

  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  expect(repositoryMock.save).toHaveBeenCalledWith(carWithoutId);
});

test('Llamar a guardar un vehiculo sin pasar un vehiculo que sea instancia de la clase Car da un error especifico', async () => {
  const car = { id: 1, brand: 'Fiat', carModel: 'Cronos' };
  await expect(carService.save(car)).rejects.toThrowError(CarNotDefinedError);
});

test('Llamar a delete del servicio sin que el vehiculo posea id arroja un error especifico', async () => {
  const carWithoutId = createTestCar();

  await expect(carService.delete(carWithoutId)).rejects.toThrowError(CarIdNotDefinedError);
});

test('llamar a delete arroja un error especifico cuando se le pasa un vehiculo que no es instancia de la clase Car', async () => {
  const car = { id: 1, brand: 'Fiat', carModel: 'Cronos' };
  await expect(carService.delete(car)).rejects.toThrowError(CarNotDefinedError);
});

test('Eliminar un vehiculo llama al metodo delete 1 vez', async () => {
  const carWithId = createTestCar(1);
  await carService.delete(carWithId);
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(repositoryMock.delete).toHaveBeenCalledWith(carWithId);
});

test('Consultar un vehiculo por id llama al metodo getById del repositorio 1 vez', () => {
  carService.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Llamar a consultar un vehiculo sin pasar un vehiculo da un error especifico', async () => {
  await expect(carService.getById()).rejects.toThrowError(CarIdNotDefinedError);
});

test('Consultar todos los vehiculos llama al metodo getAll del repositorio 1 vez', () => {
  carService.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
