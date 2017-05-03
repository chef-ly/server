var request = require('request');

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
    request.get(options, function(err, response, body) {
      res.send(JSON.parse(body));
    });
  },

  getRecipesBulk: function(req, res, next) {
    options = {
      url: hostname + '/recipes/informationBulk?ids=' + req.recipeIds,
      headers: headers
    };

    request.get(options, function(err, response, body) {
      res.send(JSON.parse(body));
    });
  },

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

    request.get(options, function(err, response, body) {
      res.send(JSON.parse(body));
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

    request.get(options, function(err, response, body) {
      var list = JSON.parse(body);
      var ids = "";
      list.results.forEach(function(x) {
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
  }
}