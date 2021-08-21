/* eslint-disable class-methods-use-this */
const UserNotDefinedError = require('./error/userNotDefinedError');

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
      throw new UserNotDefinedError();
    }
    return this.userRepository.save(user);
  }

  async getAll() {
    return this.userRepository.getAll();
  }
};
