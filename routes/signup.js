'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/signup');

// Save off user who signed up for chef.ly
router.get('/:email', controller.save);

module.exports = router;