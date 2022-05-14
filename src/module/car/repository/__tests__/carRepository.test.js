/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const CarModel = require('../../model/carModel');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const CarRepository = require('../carRepository');
const createTestCar = require('../../controller/__tests__/createTestCarSample.fixture');

const sequelizeInstance = new Sequelize('sqlite::memory');
/**
 * @type CarRepository
 */
let repository;

beforeAll(() => {
  const car = CarModel.setup(sequelizeInstance);
  repository = new CarRepository(car);
});

beforeEach(async () => {
  await sequelizeInstance.sync({ force: true });
});

test('Crea un vehiculo cuando la entidad no tiene id', async () => {
  const car = createTestCar();
  const newCar = await repository.save(car);
  expect(newCar.id).toEqual(1);
});

test('Guardar un vehiculo existente actualiza los valores', async () => {
  const car = createTestCar(1);
  const carSave = await repository.save(car);
  expect(carSave.id).toEqual(car.id);

  carSave.rentalValuePerDay = 1750;
  const modifiedCar = await repository.save(carSave);

  expect(modifiedCar.id).toEqual(car.id);
  expect(modifiedCar.rentalValuePerDay).toEqual(1750);
});

test('Guardar un vehiculo arroja un error ya que los parametros son incorrectos', async () => {
  const car = { id: 1, brand: 'Fiat', carModel: 'Cronos' };
  expect(repository.save(car)).rejects.toThrowError(CarNotDefinedError);
});

test('Eliminar un vehiculo devuelve true', async () => {
  const car = createTestCar();
  const newCar = await repository.save(car);
  expect(newCar.id).toEqual(1);

  await expect(repository.delete(newCar)).resolves.toEqual(true);
});

test('Eliminar un vehiculo sin parametros da error', async () => {
  await expect(repository.delete()).rejects.toThrowError(CarNotDefinedError);
});

test('Eliminar un vehiculo sin ID da error', async () => {
  const car = createTestCar();
  await expect(repository.delete(car)).rejects.toThrowError(CarIdNotDefinedError);
});

test('getById devuelve un error si este es llamado con un parametro incorrecto', async () => {
  await expect(repository.getById()).rejects.toThrowError(CarIdNotDefinedError);
});
