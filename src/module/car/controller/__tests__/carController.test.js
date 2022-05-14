/* eslint-disable no-undef */
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarController = require('../carController');
const Car = require('../../entity/car');
const createTestCar = require('./createTestCarSample.fixture');
const CarNotFoundError = require('../../error/CarNotFoundError');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new CarController(serviceMock);

test('getAllCars renderea allcars', async () => {
  const renderMock = jest.fn();
  await controller.getAllCars({ session: { errors: [], messages: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/allcars', {
    data: { cars: [] },
    errors: [],
    messages: [],
  });
});

test('getAddACar renderea form', async () => {
  const renderMock = jest.fn();
  const nextMock = jest.fn();
  await controller.getAddACar({ session: { errors: [] } },
    { render: renderMock },
    { next: nextMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/form');
});

test('getEditACar renderea form con un id especifico por parametro', async () => {
  const renderMock = jest.fn();
  const id = 1;
  await controller.getEditACar(
    { params: { id } },
    { render: renderMock },
  );
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/form', {
    data: { car: {} },
  });
});

test('getEditACar da un error especifico si el id recicibido es undefined', async () => {
  const nextMock = jest.fn();
  await expect(
    controller.getEditACar({ params: {} }),
  ).rejects.toThrowError(nextMock(CarIdNotDefinedError));
});

test('getEditACar llama al servicio con exito pero este arroja un error ya que el servicio no encontro un vehiculo especifico', async () => {
  const redirectMock = jest.fn();
  const car = createTestCar(1);
  const nextMock = jest.fn();

  serviceMock.getById.mockImplementationOnce(() => Promise.resolve());
  await expect(controller.getEditACar(
    { params: { id: car.id }, session: { errors: [], messages: [] } },
    { redirect: redirectMock }, { next: nextMock },
  )).rejects.toThrowError(nextMock(CarNotFoundError));
});

test('carSave crea o actualiza un vehiculo', async () => {
  const resMock = jest.fn();
  const nextMock = jest.fn();
  const redirectMock = jest.fn();

  const bodyMock = new Car({
    crestUrl: 'asdasd.png',
    carModel: '147',
    brand: 'Fiat',
    year: '1995',
    kilometres: '123444',
    color: 'White',
    airConditioner: 'Yes',
    gearBox: 'Manual',
    rentalValuePerDay: '122',
  });
  await controller.carSave(
    bodyMock, resMock, nextMock, { redirect: redirectMock('/admin/cars/allcars') },
    serviceMock.save(bodyMock),
  );

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/admin/cars/allcars');
  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
});

test('carDelete llama al servicio con el id del body y redirecciona a allcars', async () => {
  const redirectMock = jest.fn();
  const exampleCar = new Car({ id: 1 });
  serviceMock.getById.mockImplementationOnce(() => Promise.resolve(exampleCar));

  await controller.carDelete(
    { params: { id: 1 }, session: { errors: [], messages: [] } },
    { redirect: redirectMock },
  );

  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  expect(serviceMock.delete).toHaveBeenCalledWith(exampleCar);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/admin/cars/allcars');
});

test('carDelete llama al servicio pero este arroja un error ya que el ID del body es undefined', async () => {
  const car = createTestCar();
  const redirectMock = jest.fn();
  const nextMock = jest.fn();
  await expect(controller.carDelete(
    { params: { id: car.id }, session: { errors: [], messages: [] } },
    { redirect: redirectMock }, { next: nextMock },
  )).rejects.toThrowError(nextMock(CarIdNotDefinedError));
});

test('carDelete llama al servicio con exito pero este arroja un error ya que el servicio no encontro un vehiculo especifico', async () => {
  const redirectMock = jest.fn();
  const car = createTestCar(1);
  const nextMock = jest.fn();

  serviceMock.getById.mockImplementationOnce(() => Promise.resolve());

  await expect(controller.carDelete(
    { params: { id: car.id }, session: { errors: [], messages: [] } },
    { redirect: redirectMock }, { next: nextMock },
  )).rejects.toThrowError(nextMock(CarNotFoundError));
});
