/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const { fromDataToEntity } = require('../mapper/userMapper');
const AbstractUserController = require('./abstractUserController');
const UserIdNotDefinedError = require('./error/userIdNotDefinedError');

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

      if (user.id) {
        req.session.messages = [`The user with ID (${user.id} was updated correctly)`];
      } else {
        req.session.messages = [`The user (${savedUser.fullName}) with ID (${savedUser.id}) was created correctly`];
      }

      res.redirect('/admin/users/allusers');
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.redirect('/admin/users/allusers');
    }
  }

  /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  getAddAUser(req, res) {
    try {
      res.render('user/views/form');
    } catch (error) {
      req.session.errors = [error.message];
      res.redirect('/admin/users/allusers');
    }
  }

  /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  async getUserDetails(req, res) {
    const { id } = req.params;
    if (id === undefined) {
      throw new UserIdNotDefinedError();
    }
    const user = await this.userService.getById(id);

    try {
      res.render('user/views/details', {
        data: { user },
      });
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.redirect('/admin/users/allusers');
    }
  }

  async getAllUsers(req, res) {
    const { errors, messages } = req.session;
    const users = await this.userService.getAll();
    res.render('user/views/allusers', {
      data: { users },
      errors,
      messages,
    });
    req.session.errors = [];
    req.session.messages = [];
  }
};
