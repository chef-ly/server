'use strict';

var express = require('express');

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose'),
	Recipe = mongoose.model('recipe');

/* Needed if we want controllers from other files (see commented-out method below)
require('../models/recipes');
var recipeController = require('../controllers/recipe');
*/

var router = express.Router();



router.get('/:id', function(req, res) {
	//return the list of recipes
	Recipe.find({ name: new RegExp(req.params.id, 'i')}, function (err, recipe) {
		if(err) return console.error(err);
		
		console.log("logging id: "+req.params.id);
		console.log("function var2: " + recipe);
		
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
		res.send('recipe created!')
	}
);
//code below isnt working
router.post('/:id.description', function(req, res, next) {
	Recipe.findOne( {name: new RegExp((req.params.id), 'i')}, function (err, recipe) {
		if(err) return next(err);
		if (!recipe) return res.send(404);
		req.recipe = recipe;
		next();
	});
},
funcrtion(req,res,next) {
	for(key in in req.body){
		req.recipe[key] = req.body[key];
	}
	req.recipe.save(runction(err,recipe) {
		res.json(recipe);
	})
};

function returnSingleRecipe(id) {
	var recipePath = path.join(__dirname, '..', 'recipes', 'recipedetail.json');
	var recipeJson = fs.readFileSync(recipePath, 'utf8');
	var data = JSON.parse(recipeJson);
	return data;
}

function getMongoRecipe(name) {
	 
	Recipe.find({ name: /Jelly/}, function (err, recipe) {
		if(err) return console.error(err);
		
		console.log("looging id: "+name);
		console.log("function var2: " + recipe);
		
	});

}
module.exports = router;