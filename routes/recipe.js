'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipe');

//Return a recipe based off the given spoonacular id.
router.get('/:id', controller.findRecipeById);

module.exports = router;