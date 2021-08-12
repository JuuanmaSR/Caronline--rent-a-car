const AbstractCarRepository = require('./abstractCarRepository');
const CarNotFoundError = require('./error/CarNotFoundError');
const CarIdNotDefinedError = require('./error/CarIdNotDefinedError');
const { fromModelToEntity } = require('../mapper/carMapper');

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
    let carModel;

    const buildOptions = { isNewRecord: !car.id };
    carModel = this.carModel.build(car, buildOptions);
    carModel = await carModel.save();

    return fromModelToEntity(carModel);
  }

  async getAll() {
    const cars = await this.carModel.findAll();
    return cars.map(fromModelToEntity);
  }
};
