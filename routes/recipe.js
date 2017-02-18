'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose'),
	Recipe = mongoose.model('recipe');

router.get('/:id', function(req, res) {
	//return the list of recipes
	Recipe.find({ name: /Jelly/}, function (err, recipe) {
		if(err) return console.error(err);
		
		console.log("looging id: "+req.params.id);
		console.log("function var2: " + recipe);
		
		
	});
	res.end();
});

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