var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/',  helloWorld);

function helloWorld(req, res, next) {
	res.send("Hello World.");
}
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


