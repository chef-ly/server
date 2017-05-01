'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  favorites: [{recipeId: Number}]
});

mongoose.model('User', userSchema);
