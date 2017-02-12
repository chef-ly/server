'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var log = require('../utils/log');

const saltRounds = 10;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password, callback) {
  var Me = this;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    Me.salt = salt;
    bcrypt.hash(password, salt, function(err, hash) {
      Me.hash = hash;
      return callback(null, Me);
    });
  });
};

userSchema.methods.validPassword = function(password, callback) {
  bcrypt.compare(password, this.hash, function(err, res) {
    if (err) {
      log.error(err);
    } else {
      return callback(null, res);
    }
  });
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "cheflysupersecretsecret"); // TODO: DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);