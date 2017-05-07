'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');
var recipe = require('../controllers/recipe');

//Return a recipe based off the given spoonacular id.
router.get('/favorites', controller.identifyUser, controller.checkUser, controller.get, recipe.getRecipesBulk);

router.post('/favorites', controller.identifyUser, controller.checkUser, controller.addBulk);

router.get('/favorites/add/:id', controller.identifyUser, controller.checkUser, controller.add);

router.get('/favorites/remove/:id', controller.identifyUser, controller.remove);

module.exports = router;