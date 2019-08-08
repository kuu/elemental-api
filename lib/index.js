const crypto = require('crypto');
const querystring = require('querystring');

const {ParallelStream} = require('./request');

const DEFAULT_CONCURRENCY = 5;
const MAX_CONCURRENCY = 10;

class ElementalApi {
  constructor(host, user, key, options = {}) {
    this.host = host;
    this.key = user;
    this.secret = key;
    this.secure = Boolean(options.secure);
    this.expirationTime = Math.floor(options.expirationTime || 3600);
    this.concurrency = Math.min(options.concurrency || DEFAULT_CONCURRENCY, MAX_CONCURRENCY);
    this.parallelStream = new ParallelStream(this.concurrency);
  }

  getAuthKey2(text) {
    const md5 = crypto.createHash('md5');
    md5.update([this.secret, text].join(''));
    return md5.digest('hex');
  }

  getAuthKey(path, expires) {
    const md5 = crypto.createHash('md5');
    md5.update([path, this.key, this.secret, expires].join(''));
    return this.getAuthKey2(md5.digest('hex'));
  }

  get(path, params = {}, options = {}) {
    return this.request('GET', path, params, null, options);
  }

  post(path, params = {}, body = {}, options = {}) {
    return this.request('POST', path, params, body, options);
  }

  put(path, params = {}, body = {}, options = {}) {
    return this.request('PUT', path, params, body, options);
  }

  delete(path, params = {}, options = {}) {
    return this.request('DELETE', path, params, null, options);
  }

  request(method, path, params, body, options) {
    const url = [
      `${this.secure ? 'https' : 'http'}://${this.host}${path}`,
      querystring.stringify(params)
    ].join('?');
    const expires = Math.floor(Date.now() / 1000) + this.expirationTime;
    if (!options.headers) {
      options.headers = {};
    }

    const {headers} = options;

    headers['X-Auth-User'] = this.key;
    headers['X-Auth-Expires'] = expires;
    headers['X-Auth-Key'] = this.getAuthKey(path, expires);
    headers.Accept = 'application/xml';
    return this.parallelStream.add(method, url, params, body, options);
  }
}

module.exports = ElementalApi;
// es2015 default export compatibility
module.exports.default = module.exports;
