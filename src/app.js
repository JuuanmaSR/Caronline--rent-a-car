/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 3000;
// Router
const adminRoutes = require('../routes/adminRouter/admin');
// View Engine configure
app.set('view engine', 'html');
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
// Static Files
app.use(express.static('public'));

app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
