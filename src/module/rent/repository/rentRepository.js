/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
const AbstractRentRepository = require('./abstractRentRepository');
const RentIdNotDefinedError = require('../error/RentIdNotDefinedError');
const RentNotDefinedError = require('../error/RentNotDefinedError');
const RentNotFoundError = require('../error/RentNotFoundError');
const { fromModelToEntity } = require('../mapper/rentMapper');
const { fromModelToEntity: fromModelToEntityCar } = require('../../car/mapper/carMapper');
const { fromModelToEntity: fromModelToEntityUser } = require('../../user/mapper/userMapper');

module.exports = class RentRepository extends AbstractRentRepository {
  /**
     *
     * @param {typeof import('../model/rentModel')} rentModel
     * @param {typeof import('../../car/model/carModel')} carModel
     * @param {typeof import('../../user/model/userModel')} userModel
     */
  constructor(rentModel, carModel, userModel) {
    super();
    this.rentModel = rentModel;
    this.carModel = carModel;
    this.userModel = userModel;
  }

  /**
   *
   * @param {import('../entity/Rent')} rent
   *  @returns {Promise<import('../entity/Rent')>}
   */
  async save(rent) {
    if (rent === undefined) {
      throw new RentNotDefinedError('On rentRepository(save) the rent is undefined');
    }
    let rentModel;

    const buildOptions = { isNewRecord: !rent.id };
    rentModel = this.rentModel.build(rent, buildOptions);
    rentModel = await rentModel.save();

    return fromModelToEntity(rentModel);
  }

  /**
   *
   * @param {import('../entity/Rent')} rent
   *  @returns {Promise<import('../entity/Rent')>}
   */
  async getById(id) {
    if (id === undefined) {
      throw new RentIdNotDefinedError('On rentRepository(getById) the rent ID is undefined');
    }
    const rentModel = await this.rentModel.findByPk(id, {
      include: [
        { model: this.carModel, paranoid: false },
        { model: this.userModel, paranoid: false },
      ],
    });
    if (!rentModel) {
      throw new RentNotFoundError(`On rentRepository(getById) the rent with ID: ${id} not found (maybe it was deleted)`);
    }
    const rent = fromModelToEntity(rentModel);

    const carModel = await this.carModel.findByPk(rent.carId, {
      paranoid: false,
    });
    const car = fromModelToEntityCar(carModel);

    const userModel = await this.userModel.findByPk(rent.userId, {
      paranoid: false,
    });
    const user = fromModelToEntityUser(userModel);
    return { rent, user, car };
  }

  async delete(rent) {
    if (rent === undefined || !rent) {
      throw new RentNotDefinedError('On rentRepository(delete) the rent is undefined');
    }
    if (!rent.id) {
      throw new RentIdNotDefinedError('On rentRepository(delete) the rent ID is undefined');
    }
    return Boolean(await this.rentModel.destroy({ where: { id: rent.id } }));
  }

  async getAll() {
    const rents = await this.rentModel.findAll();
    return rents.map(fromModelToEntity);
  }
};
