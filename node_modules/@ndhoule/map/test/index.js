/* global describe, it, beforeEach */

'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var keys = require('@ndhoule/keys');
var sinon = require('sinon');
var map = require('../');

describe('map', function() {
  var identity, square;

  beforeEach(function() {
    identity = sinon.spy(function(val) { return val; });
    square = function(a) { return a * a; };
  });

  it('should be a function', function() {
    assert.equal(typeof map, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(map.length, 2);
  });

  it('should return a new array', function() {
    var numbers = [1, 2, 3];
    var newNumbers = map(identity, numbers);

    assert.deepEqual(newNumbers, numbers);
    assert.notEqual(newNumbers, numbers);
  });

  it('should call the input function once for each item in the collection', function() {
    map(identity, [1, 2, 3]);

    assert(identity.calledThrice);
  });

  it('should return an array containing the results of calling the input function', function() {
    assert.deepEqual(map(square, [1, 2, 3]), [1, 4, 9]);
  });

  it('should pass the input function three arguments: value, index, and array', function() {
    var array = ['a', 'b', 'c'];
    map(identity, array);

    assert(identity.calledWith('a', 0, array));
    assert(identity.calledWith('b', 1, array));
    assert(identity.calledWith('c', 2, array));
  });

  it('should iterate over arrays in indexed order', function() {
    var array = ['a', 'b', 'c'];
    var result = map(identity, array);

    assert.deepEqual(result, ['a', 'b', 'c']);
  });

  it('should ignore enumerable properties on arrays', function() {
    var array = ['a', 'b', 'c'];
    array.a = 'spam';
    map(identity, array);

    assert(identity.calledWith('a', 0, array));
    assert(identity.calledWith('b', 1, array));
    assert(identity.calledWith('c', 2, array));
    assert(identity.neverCalledWith('spam', 'a', array));
  });

  it('should map over objects (without any guarantee of order)', function() {
    var obj = { a: 1, b: 2, c: 3 };
    var ks = keys(obj);
    map(identity, obj);

    assert(identity.firstCall.calledWith(obj[ks[0]], ks[0], obj));
    assert(identity.secondCall.calledWith(obj[ks[1]], ks[1], obj));
    assert(identity.thirdCall.calledWith(obj[ks[2]], ks[2], obj));
  });

  it('should ignore inherited properties', function() {
    var parent = { z: 4 };
    var child = Object.create(parent);
    child.a = 1;
    child.b = 2;
    child.c = 3;
    map(identity, child);

    assert(identity.neverCalledWith(4, 'z', child));
  });

  it('should ignore non-enumerable properties', function() {
    var obj = Object.create(null, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false },
      c: { value: 3, enumerable: true }
    });
    map(identity, obj);

    assert(identity.calledOnce);
    assert(identity.calledWith(3, 'c', obj));
  });

  it('should handle strings', function() {
    var str = 'spam';
    map(identity, str);

    assert(identity.calledWith('s', 0, str));
    assert(identity.calledWith('p', 1, str));
    assert(identity.calledWith('a', 2, str));
    assert(identity.calledWith('m', 3, str));
  });

  it('should throw an error when passed a non-function as its `fn` argument', function() {
    assert.throws(function() { map('omg', []); });
    assert.throws(function() { map('omg', [1, 2, 3]); });
  });
});
