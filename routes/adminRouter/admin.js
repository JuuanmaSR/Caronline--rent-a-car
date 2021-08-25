/* eslint-disable no-unused-vars */
const express = require('express');
const container = require('../../src/config/dic')();

/**
 * @type {import('../../src/module/car/controller/carController')} carController
 */
const carController = container.get('CarController');
/**
 * @type {import('../../src/module/user/controller/userController')} userController
 */
const userController = container.get('UserController');

const upload = container.get('Multer');
const router = express.Router();

const routeCars = 'cars';
const routeUsers = 'users';
// Session
router.use(container.get('Session'));

// Admin routes
router.get('/', (req, res) => {
  res.render('views/admin/home', {
    username: 'Juan',
  });
});
// Cars routes
router.get(`/${routeCars}/allcars`, carController.getAllCars.bind(carController));
router.get(`/${routeCars}/addacar`, carController.getAddACar.bind(carController));
router.get(`/${routeCars}/deleteacar/:id`, carController.carDelete.bind(carController));
router.get(`/${routeCars}/editacar/:id`, carController.getEditACar.bind(carController));
router.post(`/${routeCars}/save`, upload.single('crestUrl'), carController.carSave.bind(carController));

// Users routes
router.get(`/${routeUsers}/allusers`, userController.getAllUsers.bind(userController));
router.get(`/${routeUsers}/details/:id`, userController.getUserDetails.bind(userController));
router.get(`/${routeUsers}/addauser`, userController.getAddAUser.bind(userController));
router.post(`/${routeUsers}/save`, userController.userSave.bind(userController));
module.exports = router;
