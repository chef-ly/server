'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var log = require('../utils/log');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    validate(username, function(err, user) {
      if (err) {
        log.error(err);
        return done(err);
      }

      // User is not found
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }

      user.validPassword(password, function(err, res) {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Incorrect password'
          }); 
        }
      });
    });
  }
));

function validate(username, callback) {
  // TODO: we need to access the DB here to check username and password

  var testuser = new User();

  testuser.username = 'testuser';
  testuser.setPassword('testpw', function(err, user) {
    if (err) {
      log.error(err);
      return callback(err);
    } else {
      return callback(null, user);
    }
  });
}