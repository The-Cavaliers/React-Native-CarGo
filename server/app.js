'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const User = require('../db/models/users');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/groups', routes.groups)

// Phong's work
const dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'thesis_devel',
    charset: 'utf8',
  },
};

const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

// const allowCrossDomain = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// };
//
// app.use(allowCrossDomain);


// end of Phong's work

module.exports = app;
