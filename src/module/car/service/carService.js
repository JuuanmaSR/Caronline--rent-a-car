/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../error/CarNotDefinedError');
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
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError('On the carService(save) the car is undefined');
    }
    return this.carRepository.save(car);
  }

  async delete(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError('On the carService(delete) the car is undefined ');
    }
    if (!(car.id)) {
      throw new CarIdNotDefinedError('On the carService(delete) the car ID is undefined');
    }
    return this.carRepository.delete(car);
  }

  async getById(id) {
    if (!(id)) {
      throw new CarIdNotDefinedError('On the carService(getById) the car ID is undefined');
    }
    return this.carRepository.getById(id);
  }

  async getAll() {
    return this.carRepository.getAll();
  }
};
