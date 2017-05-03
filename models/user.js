'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  favorites: [Number]
});

mongoose.model('User', userSchema);
