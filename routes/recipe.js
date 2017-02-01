'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var log = require('../utils/log');

router.get('/:id', function(req, res) {
	//return the list of recipes
	res.send(returnSingleRecipe(req.params.id));
	res.end();
	log.info('Request received at /recipe.', req.params);
});

function returnSingleRecipe(id) {
	var recipePath = path.join(__dirname, '..', 'recipes', 'recipedetail.json');
	var recipeJson = fs.readFileSync(recipePath, 'utf8');
	var data = JSON.parse(recipeJson);
	return data;
}

module.exports = router;