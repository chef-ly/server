'use strict';

var passport = require('passport');
var log = require('../utils/log');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function register(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('All username fields required');
  }

  // TODO: Check if username already exists!

  var newUser = new User();
  newUser.username = req.body.username;
  newUser.setPassword(req.body.password, function(err, user) {
    if (err) {
      res.status(500).send('Error occurred while creating password');
    } else {
      user.save(function(err) {
        var token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    }
  });
}

module.exports = register;