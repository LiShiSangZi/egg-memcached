# egg-memcached

The egg memcached plugin.
You can get/set/delete in the egg's context object directly.

## Install
```
$ npm i egg-memcached --save
```

## Usage
```javascript
// {app_root}/config/plugin.js
exports.memcached = {
  enable: true,
  package: 'egg-memcached'
};
```

## Configuration
```javascript
// {app_root}/config/config.default.js 
exports.memcached = {
  "client": {
    "hosts": ['10.0.1.1:11211'],  // The memcached cluster list.
  }
};
```
