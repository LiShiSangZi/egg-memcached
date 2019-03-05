'use strict';

const Memcached = require('memcached');

class Client {
  constructor(mem) {
    this.mem = mem;
  }

  /**
   * Get the value according to the key.
   * @param {*String} key 
   * @return {*Promise}
   */
  get(key) {
    return new Promise((resolve, reject) => {
      this.mem.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Get multi object according to the keys.
   * @param {*String} keys 
   * @return {*Promise}
   */
  getMulti(keys) {
    return new Promise((resolve, reject) => {
      this.mem.getMulti(keys, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * 
   * @param {*String} key 
   * @param {*String} value 
   * @param {*Seconds} lifetime Optional. Will be 24 hours if undefined.
   */
  set(key, value, lifetime) {
    if (typeof lifetime === 'undefined') {
      lifetime = 3600 * 24;
    }

    return new Promise((resolve, reject) => {
      this.mem.set(key, value, lifetime, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete the key/value in memcached.
   * @param {*String} key 
   */
  del(key) {
    return new Promise((resolve, reject) => {
      this.mem.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

let client = null;

function createClient(config, app) {
  if (client) {
    return client;
  }
  const memClient = new Memcached(config.hosts);
  client = new Client(memClient);
  return client;
}

module.exports = app => {
  app.addSingleton('memcached', createClient);
};

module.exports.getMemCachedClient = () => {
  return client;
}