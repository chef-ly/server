var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var controller = {};


controller.index = [
	function(req,res,name,next) {
		//find all recipes by name
		Recipe.find({ name: new RegExp(name, 'i') }, function(err, recipe) {
			if(err) return next(err);
			console.log(recipe);
		});
	}
];
/*
recipeSchema.methods.findByRecipeId = function (id, callback) {
	
	console.log('Finding by Id: ' + id)
	return this.find({ id: new RegExp(id, 'i') }, callback);
};

recipeSchema.methods.searchDescriptions = function(description, callback) {
	
	console.log('searching by description');
	return this.find({ name: '/'+description+'/'}, callback);
};
*/