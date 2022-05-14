/* eslint-disable no-unused-vars */
const Rent = require('../entity/Rent');
const Car = require('../../car/entity/car');
const CarNotDefinedError = require('../../car/error/CarNotDefinedError');
const RentIdNotDefinedError = require('../error/RentIdNotDefinedError');
const RentNotDefinedError = require('../error/RentNotDefinedError');

module.exports = class RentService {
  /**
   *
   * @param {import('../repository/rentRepository')} rentRepository
   */
  constructor(rentRepository) {
    this.rentRepository = rentRepository;
  }

  /**
   *
   * @param {import('../entity/Rent')} rent
   * @param {import('../../car/entity/car')} car
   */
  async makeRent(rent, car) {
    if (!(rent instanceof Rent)) {
      throw new RentNotDefinedError('On rentService(save) the rent is undefined');
    }

    if (!(car instanceof Car)) {
      throw new CarNotDefinedError('On rentService(save) the car is undefined');
    }
    rent.reserve(car);
    return this.rentRepository.save(rent);
  }

  /**
   *
   * @param {import('../entity/Rent')} rent
   */
  async pay(rent) {
    if (!(rent instanceof Rent)) {
      throw new RentNotDefinedError('On rentService(pay) the rent is undefined');
    }
    rent.pay();
    return this.rentRepository.save(rent);
  }
  /**
   *
   * @param {Rent} rent
   */

  async finish(rent) {
    if (!(rent instanceof Rent)) {
      throw new RentNotDefinedError('On rentService(finish) the rent is undefined');
    }
    if (rent.paymentStatus !== true) {
      throw new Error("The rent can't be finished owing to non payment");
    }
    rent.finish();
    return this.rentRepository.save(rent);
  }

  /**
 *
 * @param {Rent} rent
 */
  async cancel(rent) {
    if (!(rent instanceof Rent)) {
      throw new RentNotDefinedError('On rentService(cancel) the rent is undefined');
    }
    if (rent.paymentStatus === true) {
      throw new Error("The rent can't be canceled because is it paid");
    }
    rent.cancel();
    return this.rentRepository.save(rent);
  }

  async getById(id) {
    if (!(id)) {
      throw new RentIdNotDefinedError('On rentService(getById) the rent ID is undefined');
    }
    return this.rentRepository.getById(id);
  }

  /**
 *
 * @param {import('../entity/Rent')} rent
 */
  async delete(rent) {
    if (!(rent instanceof Rent)) {
      throw new RentNotDefinedError('On rentService(delete) the rent is undefined');
    }
    if (!(rent.id)) {
      throw new RentIdNotDefinedError('On rentService(delete) the rent ID is undefined');
    }
    await this.rentRepository.delete(rent);
  }

  async getAll() {
    return this.rentRepository.getAll();
  }

  async getArchived() {
    return this.rentRepository.getArchived();
  }

  async getByStatus(status) {
    if (!(status)) {
      throw new Error('On getByStatus the status is undefined');
    }
    return this.rentRepository.getByStatus(status);
  }
};
