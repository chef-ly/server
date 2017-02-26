'use strict';

var expect = require('chai').expect;
var request = require('request');

describe('first test', function() {
  describe('completes successfully', function() {
    it('good', function(done) {
      done();
    });
  });
});
/*
describe('check routes', function() {
  var port = process.env.PORT || 5000;
  var url = 'http://localhost:' + port;

  describe('/', function() {
    it('returns status of 200', function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/list', function() {
    it('return status of 200', function(done) {
      request(url+'/list', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  
  describe('/recipe/:id', function() {
    it('return status of 500', function(done) {
      request(url+'/recipe/1', function(error, response, body) {
        expect(response.statusCode).to.equal(500);
        done();
      });
    });
  });

  describe('/bad', function() {
    it('return status of 404 not found error', function(done) {
      request(url+'/bad', function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('authenticate with test user', function() {
    var options = {
      uri: url + '/user/login',
      method: 'POST',
      json: {
        "username": "testuser",
        "password": "testpw"
      }
    };

    it('return status of 200', function(done) {
      request.post(options, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('return jwt token', function(done) {
      request.post(options, function(error, response, body) {
        expect(body).to.not.be.undefined;
        done();
      });
    });
  });

  describe('get a profile page', function() {
    it('return status of 401 unauthorized', function(done) {
      request(url+'/user/profile', function(error, response, body) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('register a new user', function() {
    var options = {
      uri: url + '/user/register',
      method: 'POST',
      json: {
        "username": "newUsername",
        "password": "newPassword"
      }
    };

    it('return status of 200', function(done) {
      request.post(options, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('register a bad user', function() {
    var options = {
      uri: url + '/user/register',
      method: 'POST',
      json: {
        "username": "newUsername"
      }
    };

    it('return status of 400', function(done) {
      request.post(options, function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
});
*/