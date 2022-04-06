/* eslint-disable no-unused-vars */
const Rent = require('../entity/Rent');
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
    if (rent === undefined) {
      throw new RentNotDefinedError('On rentService(save) the rent is undefined');
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
      throw new RentNotDefinedError();
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
      throw new RentNotDefinedError();
    }
    if (rent.paymentStatus !== true) {
      throw new Error("The rent can't be finished owing to non payment");
    }
    rent.finish();
    return this.rentRepository.save(rent);
  }

  async getById(id) {
    if (id === undefined) {
      throw new RentIdNotDefinedError('On rentService(getById) the rent ID is undefined');
    }
    return this.rentRepository.getById(id);
  }

  /**
 *
 * @param {import('../entity/Rent')} rent
 */
  async delete(rent) {
    if (rent === undefined) {
      throw new RentNotDefinedError('On rentService(delete) the rent is undefined');
    }
    if (!rent.id) {
      throw new RentIdNotDefinedError('On rentService(delete) the rent ID is undefined');
    }
    await this.rentRepository.delete(rent);
  }

  async getAll() {
    return this.rentRepository.getAll();
  }
};
