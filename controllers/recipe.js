var mongoose = require('mongoose');
var log = require('../utils/log');
var Recipe = mongoose.model('Recipe');

module.exports = {
  findById: function (req, res, next) {
    Recipe.findById(req.params.id, function (err, recipe) {
      if (err) {
        res.status(500).send('Error while finding recipe. id: ' + req.params.id);
      } else {
        log.info("Searching for recipe._id: " + req.params.id);
        log.info("Returning: " + recipe);
        res.send(recipe);
      }
    });
  },

  saveRecipeArgCheck: function(req, res, next) {
    if("name" in req.body && req.body.name !== '') {
      next();
    } else {
      res.send(400);
    }
  },

  saveRecipe: function(req, res, next) {
    var insertRecipe = new Recipe;
    Recipe.create(req.body, function(err, recipe) {
      if (err) {
        return next(err);
      } else {
        res.send(recipe._id);
      }
    });
  },

  findList: function (req, res, next) {
    var recipesObject = {};
    var key = 'recipes';
    Recipe.find({}, '_id image name author rating categories time level', function(err, recipes){
      if(err) log.error(err);

      recipesObject[key] = recipes;

      log.info('list recipes returned');
      res.send(JSON.stringify(recipesObject));
    });
  },
  
  findByName: function (req, res, next) {
	var recipesObject = {};
	  
	Recipe.find({name: new RegExp(req.params.id, 'i')}, 
	'_id image name author rating categories time level', function(err, recipes){
		if(err) log.error(err);
		
		recipesObject['recipes'] = recipes;
		
		log.info('Searching recipe NAMES for: ' + req.params.id);
		log.info('Found the folowing recipes: ');
		log.info(JSON.stringify(recipesObject));
		
		res.send(JSON.stringify(recipesObject));
		
	});
  },
  
  testList: function(req, res, next) {
    res.send('This endpoint is for testing.');
    res.end();
  }
}