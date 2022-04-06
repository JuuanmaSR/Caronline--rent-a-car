const AbstractCarRepository = require('./abstractCarRepository');
const CarNotFoundError = require('../error/CarNotFoundError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const { fromModelToEntity } = require('../mapper/carMapper');
const { RentModel } = require('../../rent/module');

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   *
   * @param {typeof import('../model/carModel')} CarModel
   */
  constructor(CarModel) {
    super();
    this.carModel = CarModel;
  }

  /**
   *
   * @param {import('../entity/car')} car
   * @returns {Promise<import('../entity/car')>}
   */
  async save(car) {
    if (car === undefined) {
      throw new CarNotDefinedError('On carRepository(save) the car is undefined');
    }
    let carModel;

    const buildOptions = { isNewRecord: !car.id };
    carModel = this.carModel.build(car, buildOptions);
    carModel = await carModel.save();
    if (carModel === undefined) {
      throw new CarNotDefinedError('On carRepository(save) the car is undefined');
    }
    return fromModelToEntity(carModel);
  }

  async delete(car) {
    if (!car || !car.id) {
      throw new CarIdNotDefinedError('On the carRepository(delete) the car or ID is undefined');
    }

    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }

  /**
 *
 * @param {Number} id
 */
  async getById(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError('On the carRepository(getById) the car id is undefined');
    }
    const carModel = await this.carModel.findByPk(id, { include: RentModel });
    if (!carModel) {
      throw new CarNotFoundError(`Vehicle ID: ${id} not found (maybe it was deleted)`);
    }
    return fromModelToEntity(carModel);
  }

  async getAll() {
    const cars = await this.carModel.findAll();
    return cars.map(fromModelToEntity);
  }
};
