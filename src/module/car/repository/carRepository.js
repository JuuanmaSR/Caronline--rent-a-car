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

  async delete(car) {
    if (!car || !car.id) {
      throw new CarIdNotDefinedError();
    }

    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }

  /**
 *
 * @param {Number} id
 */
  async getById(id) {
    const carModel = await this.carModel.findOne({ where: { id } });
    if (!carModel) {
      throw new CarNotFoundError(`Vehicle ID: ${id} not found`);
    }
    return fromModelToEntity(carModel);
  }

  async getAll() {
    const cars = await this.carModel.findAll();
    return cars.map(fromModelToEntity);
  }
};
