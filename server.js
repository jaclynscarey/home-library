const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
