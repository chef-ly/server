'use strict'

var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipe');

// Search by ingredients
router.get('/ingredients', controller.findByIngredients);

// Search with a query
router.get('/', controller.search);

module.exports = router;