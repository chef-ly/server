'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', require('../authentication').login);

module.exports = router;