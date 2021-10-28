
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var vehicleRouter = require('./routes/vehicle');
var introRouter = require('./routes/intro');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to mongoose DB
const credentials = require("./dbCredentials.js");
const mongoose = require('mongoose');
mongoose.connect(credentials.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/', indexRouter);
app.use('/vehicle', vehicleRouter);
app.use('/intro', introRouter);


module.exports = app;
