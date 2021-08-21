/* eslint-disable no-undef */
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const CarController = require('../carController');
const Car = require('../../entity/car');

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
  await controller.getAddACar({ session: { errors: [] } }, { render: renderMock });
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

test('getEditACar da un error especifico si el id recicibido es undefined', () => {
  expect(controller.getEditACar({ params: {} })).rejects.toThrow(CarIdNotDefinedError);
});

test('carSave crea o actualiza un vehiculo', async () => {
  const redirectMock = jest.fn();
  controller.carSave(
    { session: { errors: [], messages: [] } },
    { redirect: redirectMock },
  );
  const bodyMock = new Car({
    crestUrl: '',
    carModel: '',
    brand: '',
    year: '',
    kilometres: '',
    color: '',
    airConditioner: '',
    gearBox: '',
    rentalValuePerDay: '',
  });
  await serviceMock.save(bodyMock);
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
