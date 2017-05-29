'use strict';

var request = require('request');

module.exports = {
  exists: function(req, res, next) {
    var eml = req.query.email;

    var options = { method: 'POST',
      url: 'https://chefly.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: 
       { grant_type: 'client_credentials',
         client_id: process.env.AUTH0_CLIENT_ID,
         client_secret: process.env.AUTH0_CLIENT_SECRET,
         audience: 'https://chefly.auth0.com/api/v2/' },
      json: true };

    request(options, function (error, response, body) {
      if (!error) {
        var mgmtToken = body.access_token;
        var bearer = 'Bearer ' + mgmtToken;
        
        var options2 = {
          method: 'GET',
          url: 'https://chefly.auth0.com/api/v2/users?q=email.raw:' + eml + '',
          headers: {'Authorization': bearer}
        }

        request(options2, function(e, r, user) {
          var u = JSON.parse(user);

          if (u.length > 0 && u[0].email) {
            res.send(true);
            next();
          } else {
            res.send(false);
            next();
          }
        })
      }
    });
  }
}