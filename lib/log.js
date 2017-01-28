'use strict';

var debug = require('debug')('chef.ly:log');
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return new Date().toLocaleString('en-US', { hour12: false }).replace(/,/, '');
      },
      formatter: function(options) {
        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

exports.info = function(msg, metadata) {
  logger.info(msg, metadata);
  debug(msg);
};

exports.warn = function(msg, metadata) {
  logger.warn(msg, metadata);
  debug(msg);
};

exports.error = function(msg, metadata) {
  loggaer.error(msg, metadata);
  debug(msg);
};
