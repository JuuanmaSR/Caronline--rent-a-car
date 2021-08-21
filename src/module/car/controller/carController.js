/* eslint-disable class-methods-use-this */
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
    const { errors, messages } = req.session;
    res.render('car/views/allcars', {
      data: { cars },
      errors,
      messages,
    });
    req.session.errors = [];
    req.session.messages = [];
  }

  async carDelete(req, res) {
    try {
      const { id } = req.params;
      const car = await this.carService.getById(id);
      await this.carService.delete(car);
      req.session.messages = [` (${car.brand} ${car.carModel}) vehicle with ID (${id}) could be removed sucessfully`];
    } catch (e) {
      req.session.errors = ['Vehicle could not be removed', e.message];
    }
    res.redirect('/admin/cars/allcars');
  }

  async carSave(req, res) {
    try {
      const car = fromDataToEntity(req.body);
      if (req.file) {
        const path = `/uploads/${req.file.filename}`;
        car.crestUrl = path;
      }
      const savedCar = await this.carService.save(car);

      if (car.id) {
        req.session.messages = [`The car with ID (${car.id}) was updated correctly`];
      } else {
        req.session.messages = [`The model car (${savedCar.carModel}) of the (${savedCar.brand}) brand with ID (${savedCar.id}) was created`];
      }

      res.redirect('/admin/cars/allcars');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/admin/cars/allcars');
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAddACar(req, res) {
    try {
      res.render('car/views/form');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/admin');
    }
  }

  async getEditACar(req, res) {
    const { id } = req.params;
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }
    const car = await this.carService.getById(id);
    try {
      res.render('car/views/form', {
        data: { car },
      });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/admin');
    }
  }
};
