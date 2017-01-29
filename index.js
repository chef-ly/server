var express = require('express');
var fs = require('fs');
var app = express();


app.set('port', (process.env.PORT || 9191));

app.get('/',  helloWorld);

app.get('/bye', goodbyeWorld);
app.get("/recipe/:name", getRecipe);

function helloWorld(req, res, next) {
	res.send("Hello world.");
	console.log("hello...");
}

function goodbyeWorld(req, res, next) {
	res.send("GoodBye World");
	console.log("goodbye...");
}

function getRecipe(req, res, next) {
	var name = req.params.name;
	
	var recipeJson = getFileContents(name);
	console.log("recipe requested for %s", name);
	res.send("How to make " + name);
	console.log(recipeJson);
}

function getFileContents(name) {
	var fileName = name + ".json";
	console.log(fileName);
	fs.readFile(fileName, 'utf8', function(err, contents){
		console.log(contents);
	})
}
;

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

function errHandler(err, req, res, next) {
	res.status(500).send('Error');
	log.error(err.stack);
}

/*
app.get('/', function(request, response) {
  response.render('pages/index');
});
*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port %s', app.get('port'));
});


