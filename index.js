var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(require('./routes'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port %s', app.get('port'));
});