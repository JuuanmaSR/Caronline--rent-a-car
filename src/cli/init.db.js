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
mainDb.sync();

/**
