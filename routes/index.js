'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');
var path = require('path');

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
router.use('/signup', require('./signup'));
router.use('/exists', require('./exists'));


router.get('/privacy_policy', function(req, res) {
    res.sendFile(path.join(__dirname + '/privacy_policy.html'));
});

router.get('/robots.txt', function(req, res) {
    res.sendFile(path.join(__dirname + '/robots.txt'));
});

module.exports = router;