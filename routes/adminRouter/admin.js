/* eslint-disable no-unused-vars */
const express = require('express');
const container = require('../../src/config/dic')();

/**
 * @type {import('../../src/module/car/controller/carController')} carController
 */

const carController = container.get('CarController');
const upload = container.get('Multer');
const router = express.Router();

const routeCars = 'cars';
// Session
router.use(container.get('Session'));

// Admin routes
router.get('/', (req, res) => {
  res.render('view/admin/home', {
    username: 'Juan',
  });
});
router.get(`/${routeCars}/allcars`, carController.getAllCars.bind(carController));
router.get(`/${routeCars}/addacar`, carController.getAddACar.bind(carController));
router.get(`/${routeCars}/deleteacar/:id`, carController.carDelete.bind(carController));
router.get(`/${routeCars}/editacar/:id`, carController.getEditACar.bind(carController));
router.post(`/${routeCars}/save`, upload.single('crestUrl'), carController.carSave.bind(carController));

module.exports = router;
