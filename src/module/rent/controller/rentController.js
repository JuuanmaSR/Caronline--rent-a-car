/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const RentNotDefinedError = require('../error/RentNotDefinedError');
const AbstractRentController = require('./abstractRentController');
const RentIdNotDefinedError = require('../error/RentIdNotDefinedError');
const UserError = require('../../user/error/UserError');
const CarError = require('../../car/error/CarError');
const { fromDataToEntity } = require('../mapper/rentMapper');
const Rent = require('../entity/Rent');

module.exports = class RentController extends AbstractRentController {
  /**
   *
   * @param {import('../../car/service/carService')} carService
   * @param {import('../../user/service/userService')} userService
   * @param {import('../service/rentService')} rentService
   */
  constructor(carService, userService, rentService) {
    super();
    this.carService = carService;
    this.userService = userService;
    this.rentService = rentService;
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAddRent(req, res, next) {
    try {
      const cars = await this.carService.getAll();
      const users = await this.userService.getAll();

      if (!(cars.length)) {
        throw new CarError('There are not CARS created, therefore a rent cannot be created');
      }

      if (!(users.length)) {
        throw new UserError('There are not USERS created, therefore a rent cannot be created');
      }

      res.render('rent/views/form', {
        data: {
          cars,
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getEditRent(req, res, next) {
    try {
      const { id } = req.params;
      if (!(id)) {
        throw new RentIdNotDefinedError('On rentController(getEditARent) the ID is undefined');
      }
      const { rent } = await this.rentService.getById(id);
      const cars = await this.carService.getAll();
      const users = await this.userService.getAll();
      if (!(cars.length)) {
        throw new CarError('There are not Cars created, therefore a rent cannot be created.');
      }

      if (!(users.length)) {
        throw new UserError('There are not Users created, therefore a rent cannot be created.');
      }
      res.render('rent/views/form', {
        data: {
          rent,
          cars,
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async saveRent(req, res, next) {
    try {
      const rent = fromDataToEntity(req.body);
      if (!(rent instanceof Rent)) {
        throw new RentNotDefinedError('On rentController(saveRent) the rent is undefined');
      }

      const car = await this.carService.getById(rent.carId);

      const savedRent = await this.rentService.makeRent(rent, car);
      if (!(savedRent)) {
        throw new RentNotDefinedError('On rentController(save) the rent is undefined');
      }
      if (rent.id) {
        req.session.messages = [`The rent with ID: ${rent.id} was updated correctly`];
      } else {
        req.session.messages = ['The rent  was created successful'];
      }
      res.redirect('/admin/rents/allrents');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async deleteRent(req, res, next) {
    try {
      const { id } = req.params;
      if (!(id)) {
        throw new RentIdNotDefinedError('On rentController(deleteRent) the rent ID is undefined');
      }
      const { rent, car, user } = await this.rentService.getById(id);
      await this.rentService.delete(rent);
      req.session.messages = [`The rent #${rent.id} with user #${user.id} - (${user.fullName}) and car #${car.id} - (${car.brand} - ${car.carModel}), was be archived successfully `];

      res.redirect('/admin/rents/allrents');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */

  async getHomeRents(req, res, next) {
    try {
      const status = '1';
      const rents = await this.rentService.getByStatus(status);
      res.render('views/admin/home', {
        username: 'Juan',
        data: { rents },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllRents(req, res, next) {
    try {
      const { errors, messages } = req.session;
      const rents = await this.rentService.getAll();

      res.render('rent/views/allrents', {
        data: { rents },
        errors,
        messages,
      });

      req.session.errors = [];
      req.session.messages = [];
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getRentDetails(req, res, next) {
    try {
      const { id } = req.params;
      if (!(id)) {
        throw new RentIdNotDefinedError(
          'On rentController(getRentDetails) the rent ID is undefined',
        );
      }
      const { rent, car, user } = await this.rentService.getById(id);
      res.render('rent/views/details', {
        data: {
          rent,
          car,
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getPay(req, res, next) {
    try {
      const { id } = req.params;
      if (!(id)) {
        throw new RentIdNotDefinedError('On rentController(getPay) the rent ID is undefined');
      }
      const { rent, car, user } = await this.rentService.getById(id);
      await this.rentService.pay(rent);
      req.session.messages = [`The rent #${rent.id} with user #${user.id} - (${user.fullName}) and car #${car.id} - (${car.brand} - ${car.carModel}), was  paid successfully`];

      res.redirect('/admin/rents/allrents');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async finishRent(req, res, next) {
    try {
      const { id } = req.params;
      if (!(id)) {
        throw new RentIdNotDefinedError('On rentController(getFinish) the rent ID is undefined');
      }
      const { rent, car, user } = await this.rentService.getById(id);
      await this.rentService.finish(rent);
      req.session.messages = [`The rent #${rent.id} with user #${user.id} - (${user.fullName})
       and car #${car.id} - (${car.brand} - ${car.carModel}), was finished successfully`];
      res.redirect('/admin/rents/allrents');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async cancelRent(req, res, next) {
    try {
      const { id } = req.params;
      if (!(id)) {
        throw new RentIdNotDefinedError('On rentController(getCancel) the rent ID is undefined');
      }
      const { rent, car, user } = await this.rentService.getById(id);
      await this.rentService.cancel(rent);
      req.session.messages = [`The rent #${rent.id} with user #${user.id} - (${user.fullName})
       and car #${car.id} - (${car.brand} - ${car.carModel}), was canceled successfully`];
      res.redirect('/admin/rents/allrents');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getArchivedRents(req, res, next) {
    try {
      const rents = await this.rentService.getArchived();
      res.render('rent/views/allrents', {
        title: 'Archived Rents',
        data: { rents },
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
  async getByStatusRent(req, res, next) {
    try {
      let title;
      const { status } = req.params;
      if (status === '0') {
        title = 'Pending Rents';
      } else if (status === '2') {
        title = 'Finished Rents';
      } else if (status === '3') {
        title = 'Canceled Rents';
      }
      const rents = await this.rentService.getByStatus(status);
      res.render('rent/views/allrents', {
        title,
        data: { rents },
      });
    } catch (error) {
      next(error);
    }
  }
};
