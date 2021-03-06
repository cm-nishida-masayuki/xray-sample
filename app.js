var AWS = require('aws-sdk');
var XRay = require('aws-xray-sdk');
var http = require('http');

XRay.config([XRay.plugins.EC2]);
http = XRay.captureHTTPs(http);
XRay.middleware.setDefaultName("xray-node-sample");


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var healthcheck = require('./routes/healthcheck');
var trace = require('./routes/trace');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(XRay.express.openSegment('express1'));

app.use('/', index);
app.use('/users', users);
app.use('/healthcheck', healthcheck);
app.use('/trace', trace);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(XRay.express.closeSegment());

module.exports = app;
