const UserModel = require('./model/userModel');
const UserRepository = require('./repository/userRepository');
const UserService = require('./service/userService');
const UserController = require('./controller/userController');

module.exports = {
  UserModel,
  UserRepository,
  UserService,
  UserController,
};
