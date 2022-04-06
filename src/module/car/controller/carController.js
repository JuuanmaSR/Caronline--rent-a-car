/* eslint-disable class-methods-use-this */
const { fromDataToEntity } = require('../mapper/carMapper');
const AbstractCarController = require('./abstractCarController');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const CarNotFoundError = require('../error/CarNotFoundError');

module.exports = class CarController extends AbstractCarController {
  /**
   *
   * @param {import('../service/carService')} CarService
   */
  constructor(CarService) {
    super();
    this.carService = CarService;
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getAllCars(req, res) {
    const cars = await this.carService.getAll();
    const { errors, messages } = req.session;
    res.render('car/views/allcars', {
      data: { cars },
      errors,
      messages,
    });
    req.session.errors = [];
    req.session.messages = [];
  }

  async carDelete(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new CarIdNotDefinedError('On carController(delete) the car ID is undefined');
      }
      const car = await this.carService.getById(id);
      if (car === undefined) {
        throw new CarNotFoundError('On carController(delete) the car is not found');
      }
      await this.carService.delete(car);
      req.session.messages = [` (${car.brand} ${car.carModel}) vehicle with ID (${id}) was be removed sucessfully`];
      res.redirect('/admin/cars/allcars');
    } catch (error) {
      next(error);
    }
  }

  async carSave(req, res, next) {
    try {
      const car = fromDataToEntity(req.body);
      if (car === undefined) {
        throw new CarNotDefinedError('On carController(save) the car is undefined');
      }
      if (req.file) {
        const path = `/uploads/${req.file.filename}`;
        car.crestUrl = path;
      }
      const savedCar = await this.carService.save(car);
      if (savedCar === undefined) {
        throw new CarNotDefinedError('On carController(save) the car is undefined');
      }
      if (car.id) {
        req.session.messages = [`The car with ID (${car.id}) was updated correctly`];
      } else {
        req.session.messages = [`The model car (${savedCar.carModel}) of the (${savedCar.brand}) brand with ID (${savedCar.id}) was created`];
      }

      res.redirect('/admin/cars/allcars');
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAddACar(req, res, next) {
    try {
      res.render('car/views/form');
    } catch (error) {
      next(error);
    }
  }

  async getEditACar(req, res, next) {
    const { id } = req.params;
    if (id === undefined) {
      throw new CarIdNotDefinedError('On carController(getEditACar) the car ID is undefined');
    }
    const car = await this.carService.getById(id);
    if (car === undefined) {
      throw new CarNotFoundError('On carController(getEditACar) the car is not found');
    }
    try {
      res.render('car/views/form', {
        data: { car },
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
  async getCarDetails(req, res, next) {
    try {
      const { id } = req.params;
      if (id === undefined) {
        throw new CarIdNotDefinedError('On carController(getCarDetails) the car ID is undefined');
      }
      const car = await this.carService.getById(id);
      if (car === undefined) {
        throw new CarNotFoundError('On carController(getCarDetails) the car not found');
      }
      res.render('car/views/detailsCar', {
        data: { car },
      });
    } catch (error) {
      next(error);
    }
  }
};
