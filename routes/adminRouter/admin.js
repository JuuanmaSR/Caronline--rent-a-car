/* eslint-disable no-unused-vars */
const express = require('express');

/**
 * @type {import('../../src/module/car/controller/carController')} carController
 */
const router = express.Router();
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
