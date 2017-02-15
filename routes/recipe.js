'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose'),
	Recipe = mongoose.model('recipe');

router.get('/:id', function(req, res) {
	//return the list of recipes
	res.send(getMongoRecipe(req.params.id));
	res.end();
});

function returnSingleRecipe(id) {
	var recipePath = path.join(__dirname, '..', 'recipes', 'recipedetail.json');
	var recipeJson = fs.readFileSync(recipePath, 'utf8');
	var data = JSON.parse(recipeJson);
	return data;
}

function getMongoRecipe(id) {
	var data = JSON.parse( Recipe.find({ name: /jelly/ }, function (err, id) {
		if(err) return console.error(err);
		console.log(id)
		
	}))
	return data
}
module.exports = router;