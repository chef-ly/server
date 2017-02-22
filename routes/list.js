'use strict'

var express = require('express');
var router = express.Router();
var log = require('../utils/log');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Recipe = mongoose.model('recipe');

//Return the list of recipes.
//TODO: stub recipes
router.get('/', function(req, res) {

	var recipesObject = {};
	var key = 'recipes';
	Recipe.find({}, function(err, recipes){
		if(err) console.error(err);
	
		recipesObject[key] = recipes;
		log.info('list recipes returned');
		res.send(JSON.stringify(recipesObject));
	});
	
});

router.get('/test', function(req, res) {
	res.send(returnList('Test.json'));
	res.end();
});


module.exports = router;