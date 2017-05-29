'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/exists');

//Return a recipe based off the given spoonacular id.
router.get('/', controller.exists);

module.exports = router;