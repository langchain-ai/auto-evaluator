/* globals describe, it, xit */
/* eslint-disable no-new-wrappers */

'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var keys = require('../');

/**
 * Locals.
 */

var es5It = typeof Object.create === 'function' ? it : xit;

/**
 * Tests.
 */

describe('keys', function() {
  it('should be a function', function() {
    assert.equal(typeof keys, 'function');
  });

  it('should have an arity of 1', function() {
    assert.equal(keys.length, 1);
  });

  it('it should return a list of the object\'s keys', function() {
    assert.deepEqual(
      keys({ a: 1, b: 2, c: 3 }),
      ['a', 'b', 'c']
    );
  });

  it('should skip keys in sparse arrays', function() {
    var sparse = [1];
    sparse[3] = 2;

    assert.deepEqual(
      keys(sparse),
      ['0', '3']
    );
  });

  it('should return an empty array when passed `null` or `undefined` values', function() {
    assert.deepEqual(keys(null), []);
    assert.deepEqual(keys(undefined), []);
  });

  it('should work on arrays', function() {
    assert.deepEqual(keys([]), []);
    assert.deepEqual(keys(['a', 'b', 'c']), ['0', '1', '2']);
  });

  it('should work on arguments objects', function() {
    (function() {
      assert.deepEqual(keys(arguments), ['0', '1', '2']);
    }('a', 'b', 'c'));
  });

  it('should work on string primitives', function() {
    assert.deepEqual(keys('abc'), ['0', '1', '2']);
  });

  it('should work on string objects', function() {
    assert.deepEqual(keys(new String('abc')), ['0', '1', '2']);
  });

  it('should return an empty array for non-array-like primitives', function() {
    assert.deepEqual(keys(true), []);
    assert.deepEqual(keys(/fdsa/), []);
    assert.deepEqual(keys(123), []);
  });

  es5It('should ignore non-enumerable properties', function() {
    var object = { visible: true };
    Object.defineProperty(object, 'hidden', {
      value: true,
      enumerable: false
    });

    assert.deepEqual(
      keys(object),
      ['visible']
    );
  });

  es5It('should ignore inherited properties', function() {
    var parent = { hidden: true };
    var child = Object.create(parent);
    child.visible = true;

    assert.deepEqual(
      keys(child),
      ['visible']
    );
  });
});
