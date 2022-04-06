/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const RentNotDefinedError = require('../error/RentNotDefinedError');
const AbstractRentController = require('./abstractRentController');
const RentIdNotDefinedError = require('../error/RentIdNotDefinedError');
const RentError = require('../error/RentError');

const { fromDataToEntity } = require('../mapper/rentMapper');
const UserError = require('../../user/error/UserError');

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
   * @param {import ('express').Request} req
   * @param {import ('express').Response} res
   */
  async getAddRent(req, res, next) {
    try {
      const cars = await this.carService.getAll();
      const users = await this.userService.getAll();

      if (!cars.length) {
        throw new RentError('There are not CARS created, therefore a rent cannot be created');
      }

      if (!users.length) {
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

  async getEditRent(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new RentIdNotDefinedError('On rentController(getEditARent) the ID is undefined');
      }
      const { rent } = await this.rentService.getById(id);
      const cars = await this.carService.getAll();
      const users = await this.userService.getAll();
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
   * @param {import('express'.NextFunction)} next
   */
  async saveRent(req, res, next) {
    try {
      const rent = fromDataToEntity(req.body);
      if (rent === undefined) {
        throw new RentNotDefinedError('On rentController(saveRent) the rent is undefined');
      }

      const car = await this.carService.getById(rent.carId);

      const savedRent = await this.rentService.makeRent(rent, car);
      if (savedRent === undefined) {
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
   * @param {import ('../../car/entity/car')} car
   */
  async deleteRent(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
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
   */
  async getAllRents(req, res) {
    const { errors, messages } = req.session;
    const rents = await this.rentService.getAll();

    res.render('rent/views/allrents', {
      data: { rents },
      errors,
      messages,
    });

    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getRentDetails(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
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

  async getPay(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
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

  async getFinish(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new RentIdNotDefinedError('On rentController(getFinish) the rent ID is undefined');
      }
      const { rent, car, user } = await this.rentService.getById(id);
      await this.rentService.finish(rent);
      req.session.messages = [`The rent #${rent.id} with user #${user.id} - (${user.fullName}) and car #${car.id} - (${car.brand} - ${car.carModel}), was finished successfully`];
      res.redirect('/admin/rents/allrents');
    } catch (error) {
      next(error);
    }
  }
};
