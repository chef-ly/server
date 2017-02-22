var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = new Schema({
	name: String,
	uom: String,
	nutition: []
});

var instruction = new Schema({
	step:  Number,
	instruction: String,
	nouns: [],
	verbs: []
});


var recipeSchema = new Schema({

	name: {type: String, required: true, unique: false},
	author: String,
	image_url: String,
	description: String,
	feeds: Number,
	rating: Number,
	level: String,
	categories: {type: Array, "default": []},
	time: Number,
	level: String,
	ingredients: [ ingredient],
	instructions: [instruction]
});

//Doesn't work ATM
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

