'use strict';

var passport = require('passport');
var log = require('../utils/log');

function login(req, res) {
	passport.authenticate('local', function(err, user, info) {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      // If a user is found
      var token = user.generateJwt();

      res.status(200).json({
        "token" : token
      });

      log.info('User has successfully authenticated.', {
        username: user.username
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}

module.exports = login;