'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  favorites: [{id: Number}]
});

mongoose.model('User', userSchema);
