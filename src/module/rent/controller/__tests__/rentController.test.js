/* eslint-disable no-undef */
const RentController = require('../rentController');
const createTestRent = require('./createTestRentSample.fixture');
const createTestUser = require('../../../user/controller/__tests__/createTestUserSample.fixture');
const createTestCar = require('../../../car/controller/__tests__/createTestCarSample.fixture');
const RentIdNotDefinedError = require('../../error/RentIdNotDefinedError');

const rentServiceMock = {
  makeRent: jest.fn(() => Promise.resolve({ rent: createTestRent(1) })),
  pay: jest.fn(),
  finish: jest.fn(),
  cancel: jest.fn(),
  getById: jest.fn((id) => ({
    rent: createTestRent(id),
    user: createTestUser(1),
    car: createTestCar(1),
  })),
  delete: jest.fn(),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestRent(id + 1))),
  getArchived: jest.fn(() => Array.from({ length: 3 }, (id) => createTestRent(id + 1))),
  getByStatus: jest.fn(() => Array.from({ length: 3 }, (id) => createTestRent(id + 1))),
};
const carServiceMock = {
  getAll: jest.fn(() => Array.from([createTestCar(1)])),
  getById: jest.fn((id) => createTestCar(id)),
};
const userServiceMock = {
  getAll: jest.fn(() => Array.from([createTestUser(1)])),
  getById: jest.fn((id) => createTestUser(id)),
};

const reqMock = {
  params: { id: 1, status: '2' },
  session: { errors: [], messages: [] },
};

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const nextMock = jest.fn();

const rentController = new RentController(
  carServiceMock,
  userServiceMock,
  rentServiceMock,
);

describe('Rent Controller methods', () => {
  afterEach(() => {
    Object.values(rentServiceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('getAllRents renderea allrents.html con una lista de alquileres', async () => {
    const rents = rentServiceMock.getAll();
    await rentController.getAllRents(
      reqMock, resMock, nextMock,
    );

    expect(rentServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('rent/views/allrents',
      {
        data: { rents },
        errors: [],
        messages: [],
      });
  });

  test('getRentDetails renderea details.html con un alquiler especifico', async () => {
    const { rent, user, car } = rentServiceMock.getById(1);
    await rentController.getRentDetails(reqMock, resMock, nextMock);

    expect(rentServiceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('rent/views/details', {
      data: {
        rent,
        car,
        user,
      },
    });
  });
  test('getRentDetails arroja un error cuando los parametros no contienen un id', async () => {
    await expect(
      rentController.getRentDetails({ params: {} }),
    ).rejects.toThrowError(nextMock(RentIdNotDefinedError));
  });
  test('getAddRent renderea form.html para agregar un alquiler', async () => {
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();

    await rentController.getAddRent(reqMock, resMock, nextMock);

    expect(carServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(userServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('rent/views/form', {
      data: {
        cars,
        users,
      },
    });
  });
  test('getEditRent renderea form.html para modificar un alquiler', async () => {
    const { rent } = rentServiceMock.getById(1);
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    await rentController.getEditRent(reqMock, resMock, nextMock);

    expect(rentServiceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('rent/views/form', {
      data: {
        rent,
        cars,
        users,
      },
    });
  });
  test('getEditRent arroja un error cuando los parametros no contienen un id', async () => {
    await expect(
      rentController.getEditRent({ params: {} }),
    ).rejects.toThrowError(nextMock(RentIdNotDefinedError));
  });
  test('saveRent guarda un alquiler y redirecciona a la ruta allrents', async () => {
    const reqBodyMock = {
      body: {
        id: 1,
        car_id: 1,
        user_id: 1,
        price_per_day: 1000,
        start_date: '2021-10-05T15:00',
        finish_date: '2021-10-08T15:00',
        total_price: 3000,
        payment_method: 'cash',
        payment_status: true,
        status: '0',
        createdAt: '2021-10-05T15:00',
        updatedAt: '',
        deletedAt: null,
      },
      session: { errors: [], messages: [] },
    };

    await rentController.saveRent(reqBodyMock, resMock, nextMock);
    expect(carServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(rentServiceMock.makeRent).toHaveBeenCalledTimes(1);
    expect(rentServiceMock.makeRent).toHaveBeenCalledWith(createTestRent(1), createTestCar(1));
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/admin/rents/allrents');
  });

  test('deleteRent elimina un alquiler y redirecciona a la ruta allrents', async () => {
    await rentController.deleteRent(reqMock, resMock, nextMock);

    expect(rentServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(rentServiceMock.delete).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/admin/rents/allrents');
  });

  test('deleteRent arroja un error cuando los parametros no contienen un id', async () => {
    await expect(
      rentController.deleteRent({ params: {} }),
    ).rejects.toThrowError(nextMock(RentIdNotDefinedError));
  });

  test('getHomeRents renderea home.html con una lista de alquileres', async () => {
    const rents = rentServiceMock.getAll();
    await rentController.getHomeRents(reqMock, resMock, nextMock);

    expect(rentServiceMock.getByStatus).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('views/admin/home', {
      username: 'Juan',
      data: { rents },
    });
  });

  test('getPay cambia el estado de un alquiler a pago y redirecciona a la ruta allrents', async () => {
    await rentController.getPay(reqMock, resMock, nextMock);

    expect(rentServiceMock.pay).toHaveBeenCalledTimes(1);
    expect(rentServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/admin/rents/allrents');
  });

  test('getPay arroja un error cuando los parametros no contienen un id', async () => {
    await expect(
      rentController.getPay({ params: {} }),
    ).rejects.toThrowError(nextMock(RentIdNotDefinedError));
  });

  test('finishRent cambia el estado de un alquiler a finalizado y redirecciona a la ruta allrents', async () => {
    await rentController.finishRent(reqMock, resMock, nextMock);

    expect(rentServiceMock.finish).toHaveBeenCalledTimes(1);
    expect(rentServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/admin/rents/allrents');
  });

  test('getFinish arroja un error cuando los parametros no contienen un id', async () => {
    await expect(
      rentController.finishRent({ params: {} }),
    ).rejects.toThrowError(nextMock(RentIdNotDefinedError));
  });

  test('cancelRent cambia el estado de un alquiler a cancelado y redirecciona a la ruta allrents', async () => {
    await rentController.cancelRent(reqMock, resMock, nextMock);
    expect(rentServiceMock.cancel).toHaveBeenCalledTimes(1);
    expect(rentServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/admin/rents/allrents');
  });

  test('cancelRent arroja un error cuando los parametros no contienen un id', async () => {
    await expect(
      rentController.cancelRent({ params: {} }),
    ).rejects.toThrowError(nextMock(RentIdNotDefinedError));
  });

  test('getArchivedRents renderea la vista allrents.html con una lista de alquileres', async () => {
    const rents = rentServiceMock.getArchived();
    await rentController.getArchivedRents(reqMock, resMock, nextMock);

    expect(rentServiceMock.getArchived).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('rent/views/allrents', {
      title: 'Archived Rents',
      data: { rents },
    });
  });

  test('getByStatusRent renderea la vista allrents.html con una lista de alquileres y un titulo especifico dependiendo del estado de los alquileres', async () => {
    const rents = rentServiceMock.getByStatus();
    await rentController.getByStatusRent(reqMock, resMock, nextMock);

    expect(rentServiceMock.getByStatus).toHaveBeenCalledTimes(2);
    expect(rentServiceMock.getByStatus).toHaveBeenCalledWith(reqMock.params.status);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('rent/views/allrents', {
      title: 'Finished Rents',
      data: { rents },
    });
  });
});
