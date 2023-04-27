const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
const userRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/users', userRoutes);
app.use('/', reviewsRoutes);

app.use('*', function (req, res) {
  res.render('404', { title: '404 - Page Not Found' });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
