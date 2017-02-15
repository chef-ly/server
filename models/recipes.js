var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	// TODO recipe schema
	id: Number,
	name: {type: String, required: true, unique: false},
	author: String,
	description: String,
	feeds: Number, 
	time: Number,
	rating: Number	
});


recipeSchema.methods.findByName = function(name, callback)
{
    return this.find({ name: new RegExp(name, 'i') },callback);
};

mongoose.model('recipe',recipeSchema);

