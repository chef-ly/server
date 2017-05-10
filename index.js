'use strict';

var express = require('express');
var app = express();
var log = require('./utils/log');
var morgan = require('morgan')
var bodyParser = require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Bring in data model
require('./models/db');

// Add routes
app.use('/', express.static('public'));
app.use(require('./routes'));

// Error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Determine port number
app.set('port', (process.env.PORT || 5000));

// Listen
app.listen(app.get('port'), function() {
  log.info('Node app is running on port %s', app.get('port'));
});