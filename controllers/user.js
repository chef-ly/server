'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var request = require('request');
var recipe = require('./recipe');

module.exports = {
  getId: function(req, res, next) {
    var eml = req.email;

    var options = { method: 'POST',
      url: 'https://chefly.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: 
       { grant_type: 'client_credentials',
         client_id: process.env.AUTH0_CLIENT_ID,
         client_secret: process.env.AUTH0_CLIENT_SECRET,
         audience: 'https://chefly.auth0.com/api/v2/' },
      json: true };

    request(options, function (error, response, body) {
      if (!error) {
        var mgmtToken = body.access_token;
        var bearer = 'Bearer ' + mgmtToken;
        
        var options2 = {
          method: 'GET',
          url: 'https://chefly.auth0.com/api/v2/users?q=email.raw:' + eml + '',
          headers: {'Authorization': bearer}
        }

        request(options2, function(e, r, user) {
          var u = JSON.parse(user);

          if (u.length > 0 && u[0].user_id) {
            req.params.userid = u[0].user_id;
            req.params.mgmtToken = bearer;
            next();
          } else {
            res.send("No user id found");
          }
        })
      }
    });
  },

  deleteUser: function(req, res, next) {
    var id = req.params.userid;

    var options = {
      method: 'DELETE',
      url: 'https://chefly.auth0.com/api/v2/users/' + id,
      headers: {'Authorization': req.params.mgmtToken}
    }

    request(options, function(error, response, body) {
      if (!error) {
        res.send("success");
        next();
      } else {
        res.status(500).send("error");
        next();
      }
    })
  },

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
        next();
      } else if (body == 'Bad Request') {
        res.status(response.statusCode);
        res.send("chef.ly auth0 bad request");
        next();
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

          newUser.save(function() {
            next();
          });
        } else {
          next();
        }
    });
  },

  get: function(req, res, next) {
    User.findOne({ 'email': req.email }, function(err, user) {
        if (err) next(err);

        if (user != null && user.favorites.length > 0) {
          var allIds = '';
          user.favorites.forEach(function(element) {
            allIds = allIds + element + ',';
          });
          req.recipeIds = allIds;
          next();
        } else {
          res.send("No favorites found.");
        }
    });
  },

  add: function(req, res, next) {
    User.findOne({ 'email': req.email }, function(err, user) {
        if (err) next(err);

        var ind = user.favorites.indexOf(req.params.id);
        if (ind < 0) {
          user.favorites.push(req.params.id);
          user.save();
        }

        res.send("Success");
    });
  },

  addBulk: function(req, res, next) {
    // Get the json object in the body of the request
    var add = JSON.parse(req.body.add);
    var remove = JSON.parse(req.body.remove);

    User.findOne({ 'email': req.email }, function(err, user) {
        if (err) next(err);

        add.forEach(function(id) {
          var ind = user.favorites.indexOf(id);
          if (ind < 0) {
            user.favorites.push(id);
          }
        });

        remove.forEach(function(id) {
          var ind = user.favorites.indexOf(id);
          if (ind > -1) {
            user.favorites.splice(ind, 1);
          }
        });

        user.save();
        res.send("Success");
    });
  },

  remove: function(req, res, next) {
    User.findOne({ 'email': req.email }, function(err, user) {
        if (err) next(err);

        var ind = user.favorites.indexOf(req.params.id);
        if (ind > -1) {
          user.favorites.splice(ind, 1);
          user.save();
        }

        res.send("Success");
    });
  }
}