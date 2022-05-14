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

/**
 * @type {import ('../../src/module/rent/controller/rentController')} rentController
 */
const rentController = container.get('RentController');

const upload = container.get('Multer');
const router = express.Router();

const routeCars = 'cars';
const routeUsers = 'users';
const routeRents = 'rents';
// Session
router.use(container.get('Session'));

// Cars routes
router.get(`/${routeCars}/details/:id`, carController.getCarDetails.bind(carController));
router.get(`/${routeCars}/allcars`, carController.getAllCars.bind(carController));
router.get(`/${routeCars}/addacar`, carController.getAddACar.bind(carController));
router.get(`/${routeCars}/deleteacar/:id`, carController.carDelete.bind(carController));
router.get(`/${routeCars}/editacar/:id`, carController.getEditACar.bind(carController));
router.post(`/${routeCars}/save`, upload.single('crestUrl'), carController.carSave.bind(carController));

// Users routes
router.get(`/${routeUsers}/details/:id`, userController.getUserDetails.bind(userController));
router.get(`/${routeUsers}/allusers`, userController.getAllUsers.bind(userController));
router.get(`/${routeUsers}/addauser`, userController.getAddAUser.bind(userController));
router.get(`/${routeUsers}/deleteauser/:id`, userController.deleteUser.bind(userController));
router.get(`/${routeUsers}/editauser/:id`, userController.getEditAUser.bind(userController));
router.post(`/${routeUsers}/save`, userController.userSave.bind(userController));

// Rents routes
// --- Rent home page
router.get(`/home/${routeRents}`, rentController.getHomeRents.bind(rentController));

router.get(`/${routeRents}/finish/:id`, rentController.finishRent.bind(rentController));
router.get(`/${routeRents}/cancel/:id`, rentController.cancelRent.bind(rentController));
router.get(`/${routeRents}/pay/:id`, rentController.getPay.bind(rentController));
router.get(`/${routeRents}/details/:id`, rentController.getRentDetails.bind(rentController));
router.get(`/${routeRents}/pending-rents/:status`, rentController.getByStatusRent.bind(rentController));
router.get(`/${routeRents}/finished-rents/:status`, rentController.getByStatusRent.bind(rentController));
router.get(`/${routeRents}/canceled-rents/:status`, rentController.getByStatusRent.bind(rentController));
router.get(`/${routeRents}/archived-rents`, rentController.getArchivedRents.bind(rentController));
router.get(`/${routeRents}/allrents`, rentController.getAllRents.bind(rentController));
router.get(`/${routeRents}/rentacar`, rentController.getAddRent.bind(rentController));
router.get(`/${routeRents}/deletearent/:id`, rentController.deleteRent.bind(rentController));
router.get(`/${routeRents}/editarent/:id`, rentController.getEditRent.bind(rentController));
router.post(`/${routeRents}/save`, rentController.saveRent.bind(rentController));

module.exports = router;
