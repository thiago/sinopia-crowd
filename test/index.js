'use strict';

var assert = require('assert');
var plugin = require('../lib');
var nock = require('nock');
var nocks = nock.load(__dirname + '/fixtures.json');
var stuff = {
  config: {
    self_path: __dirname + '/config'
  },
  logger: {}
};

var config = {
  base: 'http://mycrowdserver.com/',
  name: 'sinopia-crowd',
  password: 'sinopia-crowd'
};

describe('sinopia-crowd', function() {

  it('should have plugin interface', function() {
    assert.equal(typeof plugin, 'function');
    var p = plugin(config, stuff);
    assert.equal(typeof p.authenticate, 'function');
  })

  it('should not authenticate random user', function(cb) {
    var p = plugin(config, stuff);
    p.authenticate('blah', 'blah', function(err, groups) {
      assert(!err)
      assert(!groups)
      cb()
    })
  })

  it('should add user', function(cb) {
    var p = plugin(config, stuff)
    p.adduser('foo1', 'bar1', function(err, ok) {
      assert(!err)
      assert(ok)
      cb()
    })
  });
})
