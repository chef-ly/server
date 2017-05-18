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

  describe('getRecipesBulk', function() {
    it("should respond", function(done) {
      var req,res,spy;

      req = res = {};
      req.recipeIds = '479101,479102,479103';
      spy = res.send = sinon.spy();

      controller.getRecipesBulk(req, res, function() {
        expect(spy.calledOnce).to.equal(true);
        done();
      });
    });
  });

  describe('findRandomList', function() {
    it("should respond", function(done) {
      var req,res,spy;

      req = res = {};
      req.params = {};
      req.params.num = '1';
      spy = res.send = sinon.spy();

      controller.findRandomList(req, res, function() {
        expect(spy.calledOnce).to.equal(true);
        done();
      });
    });
  });

  describe('findByIngredients', function() {
    it("should respond", function(done) {
      var req,res,spy;

      req = res = {};
      req.query = {};
      req.query.ingredients = 'chicken,tomato';
      spy = res.send = sinon.spy();

      controller.findByIngredients(req, res, function() {
        expect(spy.calledOnce).to.equal(true);
        done();
      });
    });
  });

  describe('search', function() {
    it("should respond", function(done) {
      var req,res,spy;

      req = res = {};
      req.query = {};
      req.query.q = 'green curry';
      spy = res.send = sinon.spy();

      controller.search(req, res, function() {
        expect(spy.calledOnce).to.equal(true);
        done();
      });
    });
  });
});
