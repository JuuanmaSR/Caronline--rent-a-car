const AbstractUserRepository = require('./abstractUserRepository');
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

  async getAll() {
    const users = await this.userModel.findAll();
    return users.map(fromModelToEntity);
  }
};
