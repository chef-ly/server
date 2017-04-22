'use strict';

var User = mongoose.model('User');
var Promise = require('bluebird');
var request = require('request');
var recipe = require('./recipe');

module.exports = {
  getFavorites: function(req, res, next) {
    // Get the user info from auth0
    var options = {
      uri: "https://chefly.auth0.com/userinfo",
      headers: { 'Authorization': req.headers.Authorization }
    };

    request.get(options, function(err, response, body) {
      // Retrieve the recipe info from spoonacular
      User.findOne({ 'email': body.email }, function(err, user) {
        return recipe.getFavoriteRecipes(user);
      });
    });
  }
}