'use strict'

var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipe');

//Return the list of recipes.
//TODO: stub recipes
router.get('/', controller.findList);

//Return a list of recipes searching Name for the keyword(id)
router.get('/name/:id', controller.findByName);

router.get('/test', controller.testList);

module.exports = router;