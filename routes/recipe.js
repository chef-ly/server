'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipe');

//Return a recipe based off the given MongoDB id.
router.get('/:id', controller.findById);

// Save a recipe
router.post('/', controller.saveRecipeArgCheck, controller.saveRecipe);

module.exports = router;