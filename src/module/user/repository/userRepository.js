const AbstractUserRepository = require('./abstractUserRepository');
const UserNotFoundError = require('./error/userNotFoundError');
const UserIdNotDefinedError = require('./error/userIdNotDefinedError');
const { fromModelToEntity } = require('../mapper/userMapper');

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
    let userModel;

    const buildOptions = { isNewRecord: !user.id };
    userModel = this.userModel.build(user, buildOptions);
    userModel = await userModel.save();
    return fromModelToEntity(userModel);
  }

  /**
   *
   * @param {Number} id
   */
  async getById(id) {
    if (id === undefined) {
      throw new UserIdNotDefinedError();
    }
    const userModel = await this.userModel.findOne({ where: { id } });
    if (!userModel) {
      throw new UserNotFoundError(`User with ID: ${id} not found`);
    }
    return fromModelToEntity(userModel);
  }

  async getAll() {
    const users = await this.userModel.findAll();
    return users.map(fromModelToEntity);
  }
};
