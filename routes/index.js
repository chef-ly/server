'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');

/**
 * Authentication middleware
 * Verify the authorization token with the json web token
 */
var verify = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://chefly.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'chefly-api',
  issuer: 'https://chefly.auth0.com/',
  algorithms: ['RS256']
});

/**
 * Define the routes
 */
router.use('/list', require('./list'));
router.use('/recipe', require('./recipe'));
router.use('/search', require('./search'));
router.use('/user', verify, require('./user'));
router.get('/', verify, function(req, res) {
  res.send('Home Page');
});

module.exports = router;