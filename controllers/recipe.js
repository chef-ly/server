var request = require('request');

const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL: 3600, checkperiod: 3600 } );

const hostname = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com'
const spoonacularApiKey = process.env.SPOON_API_KEY;
const headers = {
  'X-Mashape-Key': spoonacularApiKey, 
  'Accept': 'application/json'
}

module.exports = {
  findRecipeById: function (req, res, next) {
    var options = {
      url: hostname + '/recipes/' + req.params.id + '/information',
      headers: headers
    };

    // Query spoonacular and get recipe summary by findById
    // request.get(options, function(err, response, body) {
    //   res.send(JSON.parse(body));
    // });
    cacheRequest(options, req.params.id, function(err, response){
      if(!err){
        res.send(response);
      }
    })
  },

  getFavoriteRecipes: function(user) {
    var allIds = '';
    
    user.favorites.forEach(function(element) {
      allIds = allIds + element.id + ',';
    }, function() {
      options = {
        url: hostname + '/recipes/informationBulk?ids=' + allIds,
        headers: headers
      };

      request.get(options, function(err, response, body) {
        return JSON.parse(body);
      });
    });
  },

// Find Random Recipes
  findRandomList: function(req, res, next) {
    // Default to 5 random recipes unless otherwise specified
    var numberRecipes = 5;
    if (req.params.num) {
      numberRecipes = req.params.num;
    }

    var options = {
      url: hostname + '/recipes/random',
      qs: {
        limitLicense:'true', 
        number: numberRecipes
      },
      headers:  headers
    };

    // using node-cache for storing the body in json
    // Try to access the item in myCache
    cacheRequest(options, "random", function(err, result){
      if(!err){
        res.send(result);
      }
    });
  },

  findByIngredients: function(req, res, next) {
    var ingredients = req.query.ingredients;

    var options = {
      url: hostname + '/recipes/findByIngredients',
      qs: {
        ingredients: ingredients,
        number: 10
      },
      headers: headers
    };

    request.get(options, function(err, response, body) {
      var list = JSON.parse(body);
      var ids = "";
      list.forEach(function(x) {
        ids = ids + x.id + ',';
      })
      
      options = {
        url: hostname + '/recipes/informationBulk?ids=' + ids.slice(0, -1),
        headers: headers
      };

      request.get(options, function(err, response, body) {
        res.send(JSON.parse(body));
      });
    });
  },

  search: function(req, res, next) {
    var q = req.query.q;

    var options = {
      url: hostname + '/recipes/search',
      qs: {
        query: q,
        number: 10
      },
      headers: headers
    };

    cacheRequest(options, q, function(err, result){
      var list = result;
      var ids = "";
      var idKey = "";

      list.results.forEach(function(x) {
        ids = ids + x.id + ',';
        
        idKey = idKey + x.id.toString()[1];
      })
      
      options = {
        url: hostname + '/recipes/informationBulk?ids=' + ids.slice(0, -1),
        headers: headers
      };

      // Using cache function, name request based on q
      cacheRequest(options, q+idKey, function(err, result){
        if(!err){
          res.send(result);
        }
      });

    });
  }
}

function cacheRequest(options, name, callback){
    // using node-cache for storing the body in json
    // Try to access the item in myCache
    name = name.toUpperCase();
    console.info("Trying to get object from cache: " + name);
    myCache.get(name, function(err, value){
      if (!err){
        if (value == undefined){
          console.info("The cache is not set for key: " + name );

          // if object not in cache perform get from spoon
          request.get(options, function(err, response, body) {
            console.info("Sending query to spoonacular");
            myCache.set(name, JSON.parse(body), function(err, success){
              if ( !err && success){
                console.info(success);
                console.info("Setting cache for key: " + name);
                //console.info(JSON.parse(body));
              }
            });
            callback(null, JSON.parse(body));
          });
        } else {
          console.info("Serving values from cache for: " + name);
          //console.info(value);
          callback(null, value);
        }
      }
    })
}