'use strict';

var express = require('express');
var app = express();
var log = require('./utils/log');
var morgan = require('morgan')
var bodyParser = require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.json());

// Initialize passport authentication
var passport = require('passport');
require('./authentication').init;
app.use(passport.initialize());

app.use(require('./routes'));

// Determine port number
app.set('port', (process.env.PORT || 5000));

// Listen
app.listen(app.get('port'), function() {
  log.info('Node app is running on port %s', app.get('port'));
});