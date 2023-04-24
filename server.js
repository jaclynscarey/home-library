const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');

require('dotenv').config();
require('./config/database');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/books', bookRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
