'use strict'

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Recipe = mongoose.model('recipe');

router.get('/', function(req, res) {
	//return the list of recipes
	var recipesObject = {};
	var key = 'recipes';
	Recipe.find({}, function(err, recipes){
		if(err) console.error(err);
	
		recipesObject[key] = recipes;
		res.send(JSON.stringify(recipesObject));
	});
	
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