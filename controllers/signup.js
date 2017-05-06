'use strict';

var mongoose = require('mongoose');
var SignupEntry = mongoose.model('Signup');

module.exports = {
  save: function(req, res, next) {
    SignupEntry.findOne({ 'email': req.params.email }, function(err, user) {
        if (err) next(err);

        if (user == null) {
          // Add user to database
          var newSignup = new SignupEntry({
            email: req.params.email
          });

          newSignup.save();
        }

        res.send('Success');
    });
  }
}