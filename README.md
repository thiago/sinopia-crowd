# Sinopia Atlassian Crowd plugin [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> auth plugin for [sinopia](https://www.npmjs.com/package/sinopia) supporting atlassian crowd

> inspired by [sinopia-github](https://www.npmjs.com/package/sinopia-github)

## Installation

```sh
$ npm install --save sinopia-crowd
```

## Usage

### config.yaml

```
auth:
  crowd:
    base: 'http://your-crowd-server/'
    name: 'application-name'
    password: 'application-password'
    ttl: 300 # Time to expire cache in seconds. Default is 0
...
packages:
  'groupprefix-*':
    access: $authenticated
    publish: group-one, group-two, user-one # these are Crowd users and/or groups
```
## License

MIT © [Thiago Rodrigues](http://trsweb.com.br)


[npm-image]: https://badge.fury.io/js/sinopia-crowd.svg
[npm-url]: https://npmjs.org/package/sinopia-crowd
[travis-image]: https://travis-ci.org/trsouz/sinopia-crowd.svg?branch=master
[travis-url]: https://travis-ci.org/trsouz/sinopia-crowd
[daviddm-image]: https://david-dm.org/trsouz/sinopia-crowd.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/trsouz/sinopia-crowd
[coveralls-image]: https://coveralls.io/repos/trsouz/sinopia-crowd/badge.svg
[coveralls-url]: https://coveralls.io/r/trsouz/sinopia-crowd
