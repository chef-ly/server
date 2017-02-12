'use strict';
var log = require('../utils/log');
var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost:27017';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  log.info('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  log.info('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  log.info('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    log.info('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// BRING IN SCHEMAS & MODELS
require('./user');