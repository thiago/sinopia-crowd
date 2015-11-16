'use strict';

var crypto = require('crypto'),
  AtlassianCrowd = require('atlassian-crowd');

function Auth(config, stuff) {
  if (!(this instanceof Auth)) {
    return new Auth(config, stuff);
  }
  stuff = stuff || {};
  var options = {
    crowd: {
      base: config.base
    },
    application: {
      name: config.name,
      password: config.password
    }
  };

  this._options = options;
  this._crowd = new AtlassianCrowd(options);
  this._logger = stuff.logger;
  this._ttl = (isNaN(+config.ttl) ? 0 : config.ttl) * 1000; // sec -> ms
  this._userCache = Object.create(null);
}

Auth.prototype.authenticate = function authenticate(username, password, done) {
  return this._get_groups(username, password, done);
};

Auth.prototype.adduser = function add_user(username, password, done) {
  return this._get_groups(username, password, function(err, res) {
    if (err) {
      return done(err, false);
    }
    return done(null, true);
  });
};

Auth.prototype._getCache = function(username, password) {
  var shasum = crypto.createHash('sha1');
  shasum.update(JSON.stringify({
    username: username,
    password: password
  }));
  var token = shasum.digest('hex');
  if (!this._userCache[token]) {
    this._userCache[token] = Object.create(null);
  }
  return this._userCache[token];
}

Auth.prototype._get_groups = function _get_groups(username, password, done) {
  var self = this,
    logger = self._logger,
    ttl = self._ttl,
    cache = self._getCache(username, password);

  if (cache.groups && Date.now() < cache.expires) {
    return done(null, cache.groups);
  }

  self._crowd.user.authenticate(username, password, function(err, info) {
    if (err) {
      return done(err, false);
    }
    cache.info = info;

    self._crowd.user.groups(username, function(err, groups) {
      if (err) {
        return done(err, false);
      } else {
        groups.push(username);
        cache.expires = Date.now() + ttl;
        cache.groups = groups;
        return done(null, groups);
      }
    });
  });
};

module.exports = Auth;
