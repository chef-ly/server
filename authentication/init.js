'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const log = require('../utils/log');

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

      // Incorrect password
      if (password !== user.password) {
        return done(null, false, {
          message: 'Incorrect pasword'
        });
      }

      return done(null, user);
    });
  }
));

function validate(username, callback) {
  // TODO: we need to access the DB here to check username and password

  var testuser = {
    username: 'testuser',
    password: 'testpw'
  };

  return callback(null, testuser);
}