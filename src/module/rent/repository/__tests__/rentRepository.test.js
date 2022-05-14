/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const RentRepository = require('../rentRepository');
const createTestRent = require('../../controller/__tests__/createTestRentSample.fixture');
const createTestUser = require('../../../user/controller/__tests__/createTestUserSample.fixture');
const createTestCar = require('../../../car/controller/__tests__/createTestCarSample.fixture');
const rentModel = require('../../model/rentModel');
const userModel = require('../../../user/model/userModel');
const carModel = require('../../../car/model/carModel');
const RentNotDefinedError = require('../../error/RentNotDefinedError');
const RentIdNotDefinedError = require('../../error/RentIdNotDefinedError');

describe('RentRepository methods', () => {
  const sequelizeInstance = new Sequelize('sqlite::memory');
  const RentModel = rentModel.setup(sequelizeInstance);
  userModel.setup(sequelizeInstance);
  carModel.setup(sequelizeInstance);

  RentModel.setupAssociations(carModel, userModel);
  const mockRepository = new RentRepository(RentModel, userModel, carModel);
  beforeEach(async () => {
    await sequelizeInstance.sync({ force: true });
  });

  test('Se guarda un alquiler en la base de datos', async () => {
    const rentWithoutId = createTestRent();
    const { id, status, totalPrice } = await mockRepository.save(rentWithoutId);

    expect(id).toEqual(1);
    expect(status).toEqual('0');
    expect(totalPrice).toEqual(3000);
  });

  test('Se actualiza un alquiler en la base de datos', async () => {
    const rentWithoutId = createTestRent();
    const rentWithId = createTestRent(1);

    rentWithId.status = '3';
    rentWithId.paymentMethod = 'debit card';

    const newRent = await mockRepository.save(rentWithoutId);
    const newRentTwo = await mockRepository.save(rentWithoutId);

    expect(newRent.id).toEqual(1);
    expect(newRent.status).toEqual('0');
    expect(newRentTwo.id).toEqual(2);

    const updateRent = await mockRepository.save(rentWithId);
    expect(updateRent.id).toEqual(1);
    expect(updateRent.status).toEqual('3');
    expect(updateRent.paymentMethod).toEqual('debit card');
  });

  test('Se lanza un error al intentar guardar un alquiler con valor undefined', async () => {
    const rent = { id: 1, status: '2', paymentMethod: 'cash' };

    await expect(mockRepository.save(rent)).rejects.toThrowError(RentNotDefinedError);
  });

  test('Se lanza un error al intentar obtener un alquiler utilizando un ID undefined', async () => {
    await expect(mockRepository.getById()).rejects.toThrowError(RentIdNotDefinedError);
  });

  test('Se obtiene un alquiler especifico a travez de su ID con los id asociados al auto y al usuario desde la base de datos', async () => {
    const rentWithoutId = createTestRent();
    const carWithId = createTestCar(1);
    const userWithId = createTestUser(1);

    await carModel.create(carWithId);
    await userModel.create(userWithId);
    await mockRepository.save(rentWithoutId);

    const { rent, user, car } = await mockRepository.getById(1);

    expect(rent.id).toEqual(1);
    expect(car.id).toEqual(1);
    expect(user.id).toEqual(1);
  });

  test('Save guarda correctamente los alquileres', async () => {
    const rentWithoutId = createTestRent();
    const rent = await mockRepository.save(rentWithoutId);
    const rent2 = await mockRepository.save(rentWithoutId);
    expect(rent.id).toEqual(1);
    expect(rent2.id).toEqual(2);
  });

  test('Delete devuelve true cuando elimina un alquiler de manera exitosa', async () => {
    const rentWithoutId = createTestRent();
    const rent = await mockRepository.save(rentWithoutId);
    expect(rent.id).toEqual(1);

    await expect(mockRepository.delete(rent)).resolves.toEqual(true);
  });

  test('Delete arroja un error cuando le pasan como parametro un alquiler que no es instancia de la clase Rent', async () => {
    const rent = { id: 1, totalPrice: 1020, status: '2' };
    await expect(mockRepository.delete(rent)).rejects.toThrowError(RentNotDefinedError);
  });
  test('Delete intenta eliminar un alquiler pero este arroja un error ya que no se encuentra el ID del mismo', async () => {
    const rent = createTestRent();
    await expect(mockRepository.delete(rent)).rejects.toThrowError(RentIdNotDefinedError);
  });
});
