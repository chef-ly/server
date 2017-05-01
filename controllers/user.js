'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var request = require('request');
var recipe = require('./recipe');

module.exports = {
  identifyUser: function(req, res, next) {
    // Get the user info from auth0
    var options = {
      uri: "https://chefly.auth0.com/userinfo",
      headers: { 'Authorization': req.headers.authorization }
    };

    request.get(options, function(err, response, body) {
      if (err) next(err);

      if (body == 'Unauthorized') {
        res.status(response.statusCode);
        res.send("chef.ly auth0 userinfo token was unauthorized");
      } else {
        var result = JSON.parse(body);
        req.email = result.email;
        next();
      }
    });
  },

  checkUser: function(req, res, next) {
    User.findOne({ 'email': req.email }, function(err, user) {
        if (err) next(err);

        if (user == null) {
          // Add user to database
          var newUser = new User({
            email: req.email,
            favorites: []
          });

          newUser.save();
        }

        next();
    });
  },

  get: function(req, res, next) {
    User.findOne({ 'email': req.email }, function(err, user) {
        if (err) next(err);

        if (user != null && user.favorites.length > 0) {
          var allIds = '';
          user.favorites.forEach(function(element) {
            allIds = allIds + element.recipeId + ',';
          });
          req.recipeIds = allIds;
          next();
        } else {
          res.send("No favorites found.");
        }
    });
  },

  add: function(req, res, next) {
    var newFavorite = { 'recipeId': req.params.id };
    User.findOneAndUpdate({ 'email': req.email }, { $push: { favorites: newFavorite } }, function(err) {
      if (err) {
        res.status(500);
        res.send("Error adding favorite");
      } else {
        res.send("Success");
      }
    });
  },

  remove: function(req, res, next) {
    res.send("Not implemented");
  }
}