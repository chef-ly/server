var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	// TODO recipe schema
	id: Number,
	name: {type: String, required: true, unique: false},
	author: String,
	description: String,
	feeds: Number, 

});


recipeSchema.methods.findByName = function(name, callback) {
	
    return this.find({ name: new RegExp(name, 'i') },callback);
};

recipeSchema.methods.findById = function (id, callback) {
	
	return this.find({ id: new RegExp(id, 'i') }, callback);
};

recipeSchema.methods.searchDescriptions = function(description, callback) {
	
	return this.find({ name: '/'+description+'/'}, callback);
};

mongoose.model('recipe',recipeSchema);

