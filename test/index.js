'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var request = require('request');

describe('first test', function() {
  describe('completes successfully', function() {
    it('good', function(done) {
      done();
    });
  });
});

describe('recipe controller tests', function() {
  var controller = require('../controllers/recipe');

  describe('findRecipeById', function() {
    it("should respond", function(done) {
      var req,res,spy;

      req = res = {};
      req.params = {};
      req.params.id = '479101';
      spy = res.send = sinon.spy();

      controller.findRecipeById(req, res, function() {
        expect(spy.calledOnce).to.equal(true);
        done();
      });
    });
  });
});
