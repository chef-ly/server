'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose'),
	Recipe = mongoose.model('recipe');

router.get('/:id', function(req, res) {
	//return the list of recipes
	Recipe.find({ name: new RegExp(req.params.id, 'i')}, function (err, recipe) {
		if(err) return console.error(err);
		
		console.log("logging id: "+req.params.id);
		console.log("function var2: " + recipe);
		
		res.send(recipe);
	});
});

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