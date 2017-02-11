'use strict';

var expect = require('chai').expect;
var request = require('request');

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
    it('return status of 200', function(done) {
      request(url+'/recipe/1', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
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

    it('return test token', function(done) {
      request.post(options, function(error, response, body) {
        expect(body.token).to.equal('testToken');
        done();
      });
    });
  });
});
