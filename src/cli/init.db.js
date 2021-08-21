require('dotenv').config();
const express = require('express');
const configureDependencyInjection = require('../config/dic');

const app = express();
const container = configureDependencyInjection(app);
/**
 * @type {import('sequelize').Sequelize} mainDb
 */
const mainDb = container.get('Sequelize');
container.get('CarModel');
container.get('UserModel');
mainDb.sync();

/**
 * @type {import('sequelize').Sequelize} sessionDb
 */
const sessionDb = container.get('SessionSequelize');
container.get('Session');
sessionDb.sync();
