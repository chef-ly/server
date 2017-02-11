'use strict';

var express = require('express');
var router = express.Router();

router.use('/list', require('./list'));
router.use('/recipe', require('./recipe'));
router.use('/user', require('./user'));

router.get('/', function(req, res) {
  res.send('Home Page');
});

module.exports = router;