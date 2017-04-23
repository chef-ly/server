'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');

//Return a recipe based off the given spoonacular id.
router.get('/favorites', controller.getFavorites);

module.exports = router;