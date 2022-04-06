/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
// Configure Dependency Injection container
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const multer = require('multer');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const {
  CarController,
  CarService,
  CarRepository,
  CarModel,
} = require('../module/car/module');
const {
  UserModel,
  UserRepository,
  UserService,
  UserController,
} = require('../module/user/module');
const {
  RentController,
  RentService,
  RentRepository,
  RentModel,
} = require('../module/rent/module');

function configureSequelizeMainDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
  return sequelize;
}
function configureSessionSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SESSION_DB_PATH,
  });
  return sequelize;
}
/**
 *
 * @param {DIContainer} container
 */
function configureSession(container) {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sequelize = container.get('SessionSequelize');
  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}
// Models Config
/**
 *
 * @param {DIContainer} container
 */
function configureCarModel(container) {
  CarModel.setup(container.get('Sequelize'));
  return CarModel;
}
/**
 *
 * @param {DIContainer} container
 */
function configureUserModel(container) {
  UserModel.setup(container.get('Sequelize'));
  return UserModel;
}
/**
 *
 * @param {DIContainer} container
 */
function configureRentModel(container) {
  const model = RentModel.setup(container.get('Sequelize'));
  model.setupAssociations(CarModel, UserModel);
  return model;
}
// Multer Config
function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.UPLOAD_PATH);
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const uploadConfigure = {
    storage,
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mietype === 'image/jpg') {
        return cb(null, true);
      }
    },
  };
  const upload = multer(uploadConfigure);
  return upload;
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureSequelizeMainDatabase),
    SessionSequelize: factory(configureSessionSequelizeDatabase),
    Multer: factory(configureMulter),
    Session: factory(configureSession),
  });
}

function addCarModulesDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('CarModel')),
    CarModel: factory(configureCarModel),
  });
}

function addUserModulesDefinitions(container) {
  container.addDefinitions({
    UserController: object(UserController).construct(get('UserService')),
    UserService: object(UserService).construct(get('UserRepository')),
    UserRepository: object(UserRepository).construct(get('UserModel')),
    UserModel: factory(configureUserModel),
  });
}

function addRentModulesDefinitions(container) {
  container.addDefinitions({
    RentController: object(RentController).construct(
      get('CarService'),
      get('UserService'),
      get('RentService'),
    ),
    RentService: object(RentService).construct(get('RentRepository')),
    RentRepository: object(RentRepository).construct(get('RentModel'), get('CarModel'), get('UserModel')),
    RentModel: factory(configureRentModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModulesDefinitions(container);
  addUserModulesDefinitions(container);
  addRentModulesDefinitions(container);
  return container;
};
