/* eslint-disable class-methods-use-this */
const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');

module.exports = class UserService {
  /**
     *
     * @param {import('../repository/userRepository')} UserRepository
     */
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  /**
 *
 * @param {import('../entity/User')} user
 */
  async save(user) {
    if (user === undefined) {
      throw new UserNotDefinedError('On userService(save) the user is undefined');
    }
    return this.userRepository.save(user);
  }

  /**
   *
   * @param {import('../entity/User)} user
   */
  async delete(user) {
    if (!user || !user.id) {
      throw new UserIdNotDefinedError('On the userService(delete) the user or ID is undefined');
    }
    return this.userRepository.delete(user);
  }

  async getById(id) {
    if (id === undefined) {
      throw new UserIdNotDefinedError('On the userService(getById) the id is undenfined');
    }
    return this.userRepository.getById(id);
  }

  async getAll() {
    return this.userRepository.getAll();
  }
};
