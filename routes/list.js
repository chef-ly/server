'use strict'

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var log = require('../utils/log');

router.get('/', function(req, res) {
	//return the list of recipes
	res.send(returnList());
	res.end();
	log.info('Request received at /list.', req.params);
});

function returnList() {
	var listPath = path.join(__dirname, '..', 'recipes', 'recipelist.json');
	var listJson = fs.readFileSync(listPath, 'utf8');
	var data = JSON.parse(listJson);
	return data;
}

module.exports = router;