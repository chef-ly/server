'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressJwt = require('express-jwt');

var auth = expressJwt({
  //TODO: BAD BAD BAD BAD BAD BAD remove from code and use env variables!!!!!!!!
  secret:  "secret"
})

router.post('/login', require('../authentication').login);

router.get('/profile', auth, function(req, res) {
  res.status(200).send('PROFILE PAGE');
});

module.exports = router;