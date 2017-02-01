var express = require('express');
var app = express();
var log = require('./utils/log');

app.set('port', (process.env.PORT || 5000));

app.use(require('./routes'));

app.listen(app.get('port'), function() {
  log.info('Node app is running on port %s', app.get('port'));
});