/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const { fromDataToEntity } = require('../mapper/userMapper');
const AbstractUserController = require('./abstractUserController');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserNotFoundError = require('../error/UserNotFoundError');

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
  async userSave(req, res, next) {
    try {
      const user = fromDataToEntity(req.body);
      if (user === undefined) {
        throw new UserNotDefinedError('On userController(save) the user is undefined');
      }
      const savedUser = await this.userService.save(user);
      if (savedUser === undefined) {
        throw new UserNotDefinedError('On userController(save) the user is undefined');
      }
      if (user.id) {
        req.session.messages = [`The user with ID (${user.id}) was updated correctly`];
      } else {
        req.session.messages = [`The user (${savedUser.fullName}) with ID (${savedUser.id}) was created correctly`];
      }

      res.redirect('/admin/users/allusers');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new UserIdNotDefinedError('On userController(delete) the user ID is undefined');
      }

      const user = await this.userService.getById(id);
      if (user === undefined) {
        throw new UserNotFoundError('On userController(delete) the user is not found');
      }
      await this.userService.delete(user);
      req.session.messages = [`The user ${user.fullName} with id #${user.id}, was be removed successfully `];
      res.redirect('/admin/users/allusers');
    } catch (error) {
      next(error);
    }
  }

  /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  getAddAUser(req, res, next) {
    try {
      res.render('user/views/form');
    } catch (error) {
      next(error);
    }
  }

  async getEditAUser(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new UserIdNotDefinedError('On userController(getEditAUser) the user ID is undefined');
      }
      const user = await this.userService.getById(id);
      if (user === undefined) {
        throw new UserNotFoundError('On userController(getEditAUser) the user is not found');
      }
      res.render('user/views/form', {
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  async getUserDetails(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new UserIdNotDefinedError('On the userController(getUserDetails) the user ID is undefined');
      }
      const user = await this.userService.getById(id);
      if (user === undefined) {
        throw new UserNotFoundError('On userController(getUserDetails) the user is not found');
      }
      res.render('user/views/details', {
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const { errors, messages } = req.session;
      const users = await this.userService.getAll();
      res.render('user/views/allusers', {
        data: { users },
        errors,
        messages,
      });
      req.session.errors = [];
      req.session.messages = [];
    } catch (error) {
      next(error);
    }
  }
};
