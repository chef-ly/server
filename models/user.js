'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  clientId: String,
  favorites: [{id: Number}]
});

mongoose.model('User', userSchema);
