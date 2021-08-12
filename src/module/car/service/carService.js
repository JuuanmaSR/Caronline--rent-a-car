/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');
const CarNotDefinedError = require('./error/carNotDefinedError');
const Car = require('../entity/car');

module.exports = class CarService {
  /**
     *
     * @param {import('../repository/carRepository')} carRepository
     */
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   *
   * @param {Car} car
   */
  async save(car) {
    if (car === undefined) {
      throw new CarNotDefinedError();
    }
    return this.carRepository.save(car);
  }

  async getAll() {
    return this.carRepository.getAll();
  }
};
