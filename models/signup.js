'use strict';

var mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
  email: String
});

mongoose.model('Signup', signupSchema);
