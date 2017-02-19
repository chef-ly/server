'use strict';

var passport = require('passport');
var log = require('../utils/log');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function register(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('All username fields required');
  } else {
    // TODO: Check if username already exists!

    var newUser = new User();
    newUser.username = req.body.username;
    newUser.setPassword(req.body.password, function(err, user) {
      if (err) {
        res.status(500).send('Error occurred while creating password');
      } else {
        user.save(function(err) {
          var token = user.generateJwt();
          
          res.status(200).json({
            "token" : token
          });

          log.info('User has successfully registered.', {
            username: user.username
          });
        });
      }
    });
  }  
}

module.exports = register;