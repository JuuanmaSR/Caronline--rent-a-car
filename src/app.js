/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 3000;
// Middlewares
app.use(express.urlencoded({ extended: false }));
// Static Files
app.use(express.static(path.join(`${__dirname}/public`)));

// View Engine
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
