/* eslint-disable eqeqeq */
/* eslint-disable global-require */
/* eslint-disable no-console */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
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
app.use(express.json());

// Static Files
app.use(express.static('public'));

app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
