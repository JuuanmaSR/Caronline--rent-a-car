/* eslint-disable no-undef */
const CarService = require('../carService');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const CarNotDefinedError = require('../error/carNotDefinedError');
const Car = require('../../entity/car');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),

};

const service = new CarService(repositoryMock);

test('Guardar un vehiculo llama al metodo save del repositorio 1 vez', () => {
  service.save({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar a guardar un vehiculo sin pasar un vehiculo da un error especifico', async () => {
  await expect(service.save).rejects.toThrowError(CarNotDefinedError);
});

test('Eliminar un vehiculo llama al metodo delete 1 vez', () => {
  service.delete(new Car({ id: 1 }));
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('Llamar a eliminar un vehiculo sin pasar un vehiculo da un error especifico', async () => {
  await expect(service.delete).rejects.toThrowError(CarNotDefinedError);
});

test('Consultar un vehiculo por id llama al metodo getById del repositorio 1 vez', () => {
  service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Llamar a consultar un vehiculo sin pasar un vehiculo da un error especifico', async () => {
  await expect(service.getById).rejects.toThrowError(CarIdNotDefinedError);
});

test('Consultar todos los vehiculos llama al metodo getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
