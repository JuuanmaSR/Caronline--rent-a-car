/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const { fromDataToEntity } = require('../mapper/userMapper');
const AbstractUserController = require('./abstractUserController');

module.exports = class UserController extends AbstractUserController {
  /**
     *
     * @param {import('../service/userService')} UserService
     */
  constructor(UserService) {
    super();
    this.userService = UserService;
  }

  /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  async userSave(req, res) {
    try {
      const user = fromDataToEntity(req.body);
      const savedUser = await this.userService.save(user);
      console.log(savedUser);
      res.redirect('/admin');
    } catch (error) {
      console.log(error);
    }
  }

  /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  getAddAUser(req, res) {
    res.render('user/views/form');
  }

  async getAllUsers(req, res) {
    const users = await this.userService.getAll();
    res.render('user/views/allusers', {
      data: { users },
    });
  }
};
