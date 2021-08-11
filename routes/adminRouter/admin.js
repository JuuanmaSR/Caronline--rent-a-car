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

module.exports = router;
