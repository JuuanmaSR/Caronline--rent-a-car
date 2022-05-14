/* eslint-disable prefer-const */
/* eslint-disable no-undef */
const RentService = require('../rentService');
const RentNotDefinedError = require('../../error/RentNotDefinedError');
const RentIdNotDefinedError = require('../../error/RentIdNotDefinedError');
const CarNotDefinedError = require('../../../car/error/CarNotDefinedError');
const createTestCar = require('../../../car/controller/__tests__/createTestCarSample.fixture');
const createTestRent = require('../../controller/__tests__/createTestRentSample.fixture');

describe('Rent service methods', () => {
  let repositoryMock;
  /**
     * @type {import('../rentService')}
     */
  let rentService;

  beforeEach(() => {
    repositoryMock = {
      save: jest.fn(),
      getById: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      getArchived: jest.fn(),
      getByStatus: jest.fn(),

    };
    rentService = new RentService(repositoryMock);
  });
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });
  test('El servicio a través del metodo  makeRent  llama al metodo save del repositorio, el precio por dia  y el total son tomados desde la reserva', async () => {
    const rent = createTestRent(1);
    const car = createTestCar(1);

    await rentService.makeRent(rent, car);

    expect(rent.totalPrice).toEqual(3000);
    expect(rent.status).toEqual('0');
    expect(repositoryMock.save).toBeCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(rent);
  });

  test('El servicio a través del metodo makeRent llama al metodo save del repositorio, el precio por dia y el total son tomados desde los valores el vehiculo', async () => {
    const rent = createTestRent(1);
    rent.pricePerDay = undefined;
    rent.totalPrice = undefined;
    const car = createTestCar(1);

    await rentService.makeRent(rent, car);
    expect(rent.pricePerDay).toEqual(4000);
    expect(rent.totalPrice).toEqual(12000);
    expect(rent.status).toEqual('0');
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(rent);
  });

  test('El servicio a través del metodo makeRent llama al metodo save del repositorio con un parametro que no es instancia de la clase Rent por lo tanto este arroja un error', async () => {
    const rent = { id: 1, pricePerDay: 4000, totalPrice: 12000 };

    await expect(rentService.makeRent(rent)).rejects.toThrowError(RentNotDefinedError);
  });

  test('El servicio a través del metodo makeRent llama al metodo save del repositorio con un parametro que no es instancia de la clase Car por lo tanto este arroja un error', async () => {
    const rent = createTestRent(1);
    const car = { id: 1, carModel: 'cronos', brand: 'Fiat' };

    await expect(rentService.makeRent(rent, car)).rejects.toThrowError(CarNotDefinedError);
  });

  test('El servicio a través del metodo pay cambia de estado un alquiler a "pago" y luego lo guarda con el metodo save del repositorio', async () => {
    const rent = createTestRent(1);

    await rentService.pay(rent);

    expect(rent.status).toEqual('1');
    expect(rent.paymentStatus).toBeTruthy();
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(rent);
  });

  test('El servicio a  través del metodo pay  intenta cambiar el estado de un alquiler a "pago" pero se le pasa un parametro incorrecto el cual no es una instancia del objeto Rent', async () => {
    const rent = { id: 1, paymentStatus: true, status: 2 };
    await expect(rentService.pay(rent)).rejects.toThrowError(RentNotDefinedError);
  });

  test('El servicio a través del metodo finish cambia de estado un alquiler a "finalizado" siempre que este ya este pago y luego lo guarda con el metodo save del repositorio', async () => {
    const rent = createTestRent(1);
    await rentService.pay(rent);
    await rentService.finish(rent);

    expect(rent.status).toEqual('2');
    expect(rent.paymentStatus).toBeTruthy();
    expect(repositoryMock.save).toHaveBeenCalledTimes(2);
    expect(repositoryMock.save).toHaveBeenCalledWith(rent);
  });

  test('El servicio a través del metodo finish intenta cambiar de estado un alquiler a "finalizado" pero este arroja un error ya que el alquiler no esta pago', async () => {
    const rent = createTestRent(1);
    rent.paymentStatus = false;
    rent.status = '0';
    await expect(rentService.finish(rent)).rejects.toThrowError("The rent can't be finished owing to non payment");
  });

  test('El servicio a través del metodo finish intenta cambiar de estado un alquiler a "finalizado" pero este arroja un error ya que se le pasa un parametro que no es instancia del objeto Rent', async () => {
    const rent = { id: 1, paymentStatus: true, status: 2 };

    await expect(rentService.finish(rent)).rejects.toThrowError(RentNotDefinedError);
  });

  test('El servicio a través del metodo cancel intenta cambiar de estado un alquiler a "cancelado" siempre que este no este pago, luego lo guarda con el metodo save del repositorio', async () => {
    const rent = createTestRent(1);
    rent.status = '0';
    rent.paymentStatus = false;
    await rentService.cancel(rent);
    expect(rent.status).toEqual('3');
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(rent);
  });

  test('El servicio a través del metodo cancel intenta cambiar de estado un alquiler a "cancelado" pero este arroja un error ya que se encuentra pago', async () => {
    const rent = createTestRent(1);
    rent.status = '1';
    expect(rent.paymentStatus).toBeTruthy();
    await expect(rentService.cancel(rent)).rejects.toThrowError("The rent can't be canceled because is it paid");
  });

  test('El servicio a través del metodo cancel intenta cambiar de estado un alquiler a "cancel" pero este arroja un error ya que los parametros no son instancias del objeto Rent', async () => {
    const rent = { id: 1, paymentStatus: true, status: '2' };
    await expect(rentService.cancel(rent)).rejects.toThrowError(RentNotDefinedError);
  });

  test('El servicio a través del metodo getById llama al repositorio para solicidar un alquiler especifico por medio de su ID', async () => {
    const id = 1;
    await rentService.getById(id);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(id);
  });

  test('El servicio llama al metodo getById sin un parametro correcto, entonces este arroja un error', async () => {
    await expect(rentService.getById()).rejects.toThrowError(RentIdNotDefinedError);
  });

  test('El servicio llama al metodo delete para archivar un alquiler que ya esta finalizado que este a su vez llama al metodo delete del repositorio', async () => {
    const rent = createTestRent(1);
    await rentService.delete(rent);

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(rent);
  });

  test('El servicio llama al metodo delete pero se pasa un parametro incorrecto y arroja un error ya que este no es una instancia de la clase Rent', async () => {
    const rent = { id: 1, paymentStatus: true, status: '1' };

    await expect(rentService.delete(rent)).rejects.toThrowError(RentNotDefinedError);
  });

  test('El servicio llama al metodo delete pero este arroja un error ya que el parametro que se pasa no contiene un Id', async () => {
    const rent = createTestRent();
    await expect(rentService.delete(rent)).rejects.toThrowError(RentIdNotDefinedError);
  });

  test('El servicio llama al metodo getAll que este a su vez llama al metodo del repositorio', async () => {
    await rentService.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
  test('El servicio llama al metodo getArchived que este a su vez llama al metodo del repositorio', async () => {
    await rentService.getArchived();
    expect(repositoryMock.getArchived).toHaveBeenCalledTimes(1);
  });
  test('El servicio llama al metodo getByStatus que este a su vez llama al metodo del repositorio', async () => {
    const status = '2';
    await rentService.getByStatus(status);
    expect(repositoryMock.getByStatus).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getByStatus).toHaveBeenCalledWith(status);
  });
  test('El servicio llama al metodo getByStatus pero este arroja un error ya que el parametro es incorrecto', async () => {
    await expect(rentService.getByStatus()).rejects.toThrowError('On getByStatus the status is undefined');
  });
});
