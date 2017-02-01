'use strict';

var express = require('express');
var router = express.Router();
var log = require('../utils/log');

router.use('/list', require('./list'));

router.use('/recipe', require('./recipe'));

router.get('/', function(req, res) {
  res.send('Home Page');
});

module.exports = router;