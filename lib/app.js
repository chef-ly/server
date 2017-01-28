'use strict';

var app = require('express')();
var log = require('./log');

const _port = 9191;

app.all('/', helloWorld, errHandler);

function helloWorld(req, res, next) {
	res.send("Hello World.");
};

function errHandler(err, req, res, next) {
	res.status(500).send('Error');
	log.error(err.stack);
};

app.listen(_port, function() {
  log.info('Express server starting up on port %s', _port);
});
