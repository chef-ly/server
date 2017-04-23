'use strict';

var mongoose = require('mongoose');
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
      if (body.email) {
        // Retrieve the recipe info from spoonacular
        User.findOne({ 'email': body.email }, function(err, user) {
            if (err) next(err);

            if (user) {
              res.send(recipe.getFavoriteRecipes(user));
            } else {
              res.send("No favorites found.");
            }
        });
      } else {
        if (body == 'Unauthorized') {
          res.status(response.statusCode);
          res.send("chef.ly auth0 userinfo token was unauthorized");
        } else {
          res.send("error");
        }
      }
    });
  }
}