/* eslint-disable class-methods-use-this */
const { render } = require('nunjucks');
const { fromDataToEntity } = require('../mapper/carMapper');
const AbstractCarController = require('./abstractCarController');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');

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
    // const { errors, messages } = req.session;
    res.render('view/admin/allcars', {
      data: { cars },
    });
  }

  async carSave(req, res) {
    try {
      const car = fromDataToEntity(req.body);
      if (req.file) {
        const path = `/uploads/${req.file.filename}`;
        car.crestUrl = path;
      }
      console.log(car);
      const savedCar = await this.carService.save(car);
      /*
      if (car.id) {
        req.session.message = [`The car with id ${car.id} was updated correctly`];
      } else {
        req.session.message = [`The model car ${savedCar.carModel} of the ${savedCar.brand} with id ${savedCar.id} was created`];
      }
      */
      res.redirect('/admin');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/admin');
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAddACar(req, res) {
    try {
      res.render('view/admin/form', {
        title: 'Add a car',
      });
    } catch (error) {
      req.session.error = [error.message];
      res.redirect('/admin');
    }
  }
};
