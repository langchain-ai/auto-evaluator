/* global describe it xit beforeEach */
/* eslint no-new-wrappers: 0 */

'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var keys = require('@ndhoule/keys');
var sinon = require('sinon');
var each = require('../');

/**
 * Locals.
 */

var es5It = typeof Object.create === 'function' ? it : xit;

/**
 * Tests.
 */

describe('each', function() {
  var identity;

  beforeEach(function() {
    identity = sinon.spy(function(val) {
      return val;
    });
  });

  it('should be a function', function() {
    assert.equal(typeof each, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(each.length, 2);
  });

  it('should invoke the `iterator` for each value in the collection, passing `value`, `key`, and `collection`', function() {
    var elems = ['zero', 'one', 'two'];
    each(identity, elems);

    assert(identity.calledWithExactly('zero', 0, elems));
    assert(identity.calledWithExactly('one', 1, elems));
    assert(identity.calledWithExactly('two', 2, elems));
  });

  it('should iterate in left-to-right order', function() {
    var elems = [1, 0, 7, 14];
    each(identity, elems);

    assert(identity.firstCall.calledWithExactly(1, 0, elems));
    assert(identity.secondCall.calledWithExactly(0, 1, elems));
    assert(identity.thirdCall.calledWithExactly(7, 2, elems));
    assert(identity.lastCall.calledWithExactly(14, 3, elems));
  });

  it('should return `undefined`', function() {
    assert(each(identity, [1, 2, 3]) === undefined);
  });

  it('should exit early when the provided callback returns `false`', function() {
    each(identity, [1, 2, 3, false, 4]);

    assert.equal(identity.callCount, 4);
    assert(identity.calledWith(1));
    assert(identity.calledWith(2));
    assert(identity.calledWith(3));
    assert(identity.calledWith(false));
  });

  it('should pass the original collection, allowing mutation', function() {
    var elems = [5, 4, 3, 2, 1];
    each(function(val, i, coll) {
      coll[i] = 'omg';
    }, elems);

    assert.deepEqual(elems, ['omg', 'omg', 'omg', 'omg', 'omg']);
  });

  it('should work on arrays', function() {
    var elems = ['a', 'b', 'c', 'd'];
    each(identity, elems);

    assert(identity.firstCall.calledWithExactly('a', 0, elems));
    assert(identity.secondCall.calledWithExactly('b', 1, elems));
    assert(identity.thirdCall.calledWithExactly('c', 2, elems));
    assert(identity.lastCall.calledWithExactly('d', 3, elems));
  });

  it('should work on objects (with no guarantee of iteration order)', function() {
    var elems = {
      a: 1,
      b: 2,
      c: 3
    };
    // Compensate for object iteration being platform-specific by getting
    // this platform's iteration order
    var iter = keys(elems);
    each(identity, elems);

    assert(identity.firstCall.calledWithExactly(elems[iter[0]], iter[0], elems));
    assert(identity.secondCall.calledWithExactly(elems[iter[1]], iter[1], elems));
    assert(identity.thirdCall.calledWithExactly(elems[iter[2]], iter[2], elems));
  });

  es5It('should work on strings', function() {
    var string = 'tim';
    each(identity, string);

    assert(identity.firstCall.calledWithExactly('t', 0, string));
    assert(identity.secondCall.calledWithExactly('i', 1, string));
    assert(identity.thirdCall.calledWithExactly('m', 2, string));
  });

  es5It('should work on string objects', function() {
    var string = new String('tim');
    each(identity, string);

    assert(identity.firstCall.calledWithExactly('t', 0, string));
    assert(identity.secondCall.calledWithExactly('i', 1, string));
    assert(identity.thirdCall.calledWithExactly('m', 2, string));
  });

  es5It('should ignore inherited properties', function() {
    var parent = {
      enchanter: 'Tim'
    };
    var child = Object.create(parent);
    child.a = 1;
    each(identity, child);

    assert(identity.calledOnce);
    assert(identity.calledWith(1, 'a', child));
    assert(!identity.calledWith('Tim', 'enchanter'));
  });

  es5It('should ignore non-enumerable properties', function() {
    var obj = Object.create(null, {
      a: {
        value: 1,
        enumerable: false
      },
      b: {
        value: 2,
        enumerable: false
      },
      c: {
        value: 3,
        enumerable: true
      }
    });
    each(identity, obj);

    assert(identity.calledOnce);
    assert(identity.calledWith(3, 'c', obj));
  });
});
