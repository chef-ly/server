'use strict'

var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipe');

//Return the list of recipes.
//TODO: stub recipes
router.get('/', controller.findList);

router.get('/test', controller.testList);

module.exports = router;