'use strict';

var AtlassianCrowd = require('atlassian-crowd');

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

  if (typeof config.groups === 'string') {
    this._groups = config.groups.replace(/,\s/gi, ',').split(',').filter(function(i) {
      return !!i
    });
  } else if (Array.isArray(config.groups)) {
    this._groups = config.groups;
  } else {
    this._groups = [];
  }

  this._options = options;
  this._crowd = new AtlassianCrowd(options);
  this._logger = stuff.logger;
}

Auth.prototype.authenticate = function authenticate(username, password, done) {
  return this._get_groups(username, password, done);
};

Auth.prototype.adduser = function add_user(username, password, done) {
  return this._get_groups(username, password, function(err, res){
    if(err){
      return done(err, false);
    }
    return done(null, true);
  });
};

Auth.prototype._get_groups = function _get_groups(username, password, done) {
  this._crowd.user.authenticate(username, password, function(err, res) {
    if (err) {
      if(err.type === 'USER_NOT_FOUND'){
        return done(null, false);
      }

        return done(err, false);
    }

    return done(null, res);
  });
};

module.exports = Auth;
