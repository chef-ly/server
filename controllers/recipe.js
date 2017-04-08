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
  }
}