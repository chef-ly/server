'use strict';

var express = require('express');
var log 	= require('util-logging');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose'),
	Recipe = mongoose.model('recipe');

/* Needed if we want controllers from other files (see commented-out method below)
require('../models/recipes');
var recipeController = require('../controllers/recipe');
*/

var router = express.Router();
var logger = new log.ConsoleLogger().setLevel(log.Level.INFO);

//Return a recipe based off the given MongoDB id.
router.get('/:id', function(req, res) {

	Recipe.findById(req.params.id, function (err, recipe) {
		if (err) {
      		res.status(500).send('Error while finding recipe. id: ' + req.params.id);
    }
		
		logger.info("logging id: " + req.params.id);
		logger.info("function var2: " + recipe);
		
		res.send(recipe);
	});
});


/*
* We don't have this working yet.
router.get('/:id', recipeController.index());
*/

//
router.post('/', function(req, res, next) {
	if("name" in req.body && req.body.name !== '') {
		next();
	} else {
		res.send(400);
	}
},
	function(req,res,next) {
		var insertRecipe = new Recipe;
		Recipe.create(req.body, function(err, recipe) {
			if(err)
				return next(err);
		});

		res.send('recipe created!');
	}
);

//code below isnt working
/*
router.post('/:id.description', function(req, res, next) {
	Recipe.findOne( {name: new RegExp((req.params.id), 'i')}, function (err, recipe) {
		if(err) return next(err);
		if (!recipe) return res.send(404);
		req.recipe = recipe;
		next();
	});
},
function(req,res,next) {
	for(key in in req.body){
		req.recipe[key] = req.body[key];
	}
	req.recipe.save(runction(err,recipe) {
		res.json(recipe);
	})
};
*/

function returnSingleRecipe(id) {
	var recipePath = path.join(__dirname, '..', 'recipes', 'recipedetail.json');
	var recipeJson = fs.readFileSync(recipePath, 'utf8');
	var data = JSON.parse(recipeJson);
	return data;
}

function getMongoRecipe(name) {
	 
	Recipe.find({ name: /Jelly/}, function (err, recipe) {
		if(err) return console.error(err);
		
		logger.info("logging id: "+name);
		logger.info("function var2: " + recipe);
		
	});

}
module.exports = router;