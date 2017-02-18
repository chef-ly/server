'use strict'

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {
	//return the list of recipes
	res.send(returnList('recipelist.json'));
	res.end();
});

router.get('/test', function(req, res) {
	res.send(returnList('Test.json'));
	res.end();
});

function returnList(fileName) {
	var listPath = path.join(__dirname, '..', 'recipes', fileName);
	var listJson = fs.readFileSync(listPath, 'utf8');
	var data = JSON.parse(listJson);
	return data;
}

module.exports = router;