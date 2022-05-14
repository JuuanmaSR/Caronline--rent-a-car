const AbstractUserRepository = require('./abstractUserRepository');
const UserNotFoundError = require('../error/UserNotFoundError');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const { fromModelToEntity } = require('../mapper/userMapper');
const { RentModel } = require('../../rent/module');
const User = require('../entity/User');

module.exports = class UserRepository extends AbstractUserRepository {
  /**
     *
     * @param {typeof import('../model/userModel')} UserModel
     */
  constructor(UserModel) {
    super();
    this.userModel = UserModel;
  }

  /**
   *
   * @param {import('../entity/User')} user
   * @returns {Promise<import('../entity/User')>}
   */
  async save(user) {
    if (!(user instanceof User)) {
      throw new UserNotDefinedError('On userRepository(save) the user is undefined');
    }
    let userModel;

    const buildOptions = { isNewRecord: !user.id };
    userModel = this.userModel.build(user, buildOptions);
    userModel = await userModel.save();
    if (!(userModel)) {
      throw new UserNotDefinedError('On userRepository(save) the user is undefined');
    }
    return fromModelToEntity(userModel);
  }

  /**
  *
  * @param {import('../entity/User')} user
  */

  async delete(user) {
    if (!(user instanceof User)) {
      throw new UserNotDefinedError('On userRepository(delete) the user is undefined');
    }
    if (!(user.id)) {
      throw new UserIdNotDefinedError('On userRepository(delete) the car or ID is undefined');
    }

    return Boolean(await this.userModel.destroy({ where: { id: user.id } }));
  }

  /**
   *
   * @param {Number} id
   */
  async getById(id) {
    if (!(id)) {
      throw new UserIdNotDefinedError('On userRepository(getById) the id is undefined');
    }
    const userModel = await this.userModel.findByPk(id, { include: RentModel });
    if (!userModel) {
      throw new UserNotFoundError(`User with ID: ${id} not found (maybe it was deleted)`);
    }
    return fromModelToEntity(userModel);
  }

  async getAll() {
    const users = await this.userModel.findAll();
    return users.map(fromModelToEntity);
  }
};
