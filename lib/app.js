'use strict';

var app = require('express')();

app.all('/', helloWorld, errHandler);

/**
 * First hello world middleware function for default namespace
 */

function helloWorld(req, res, next) {
	res.send("Hello World.");
};

/**
 * Error Handler middleware
 */

function errHandler(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Error');
};

app.listen(9181);