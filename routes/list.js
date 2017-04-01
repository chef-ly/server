'use strict'

var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipe');

// Get a random list of recipes
router.get('/random', controller.findRandomList);

// Get a random list of recipes (limited by number of recipes)
router.get('/random/:num', controller.findRandomList);

module.exports = router;