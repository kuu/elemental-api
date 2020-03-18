const fetch = require('node-fetch');
const throughParallel = require('through2-parallel');
const HttpsProxyAgent = require('https-proxy-agent');
const debug = require('debug');
const {stringify, tryCatch, THROW} = require('./utils');

const print = debug('ele');

const agent = (function (proxy) {
  if (proxy) {
    return new HttpsProxyAgent(proxy);
  }
  return null;
})(process.env.HTTP_PROXY);

function createStream(concurrency, transformFunction, flushFunction) {
  return throughParallel.obj({concurrency}, transformFunction, flushFunction);
}

class ParallelStream {
  constructor(concurrency) {
    this.stream = createStream(concurrency, (obj, enc, cb) => {
      send(...obj.params)
        .then(data => {
          obj.resolve(data);
          cb();
        }).catch(err => {
          obj.reject(err);
          cb();
        });
    });
  }

  add(...params) {
    return new Promise((resolve, reject) => {
      this.stream.write({params, resolve, reject});
    });
  }
}

function send(method, url, params = {}, body = {}, options = {}) {
  let bodyToSend;

  if (!body || typeof body === 'string') {
    bodyToSend = body;
  } else if (Buffer.isBuffer(body) || typeof body !== 'object') {
    bodyToSend = body;
  } else {
    bodyToSend = body ? stringify(body) : '';
  }

  if (params === null) {
    params = {};
  }

  print(`[${method}] ${url}
  ${Buffer.isBuffer(bodyToSend) ? `[Buffer length=${bodyToSend.length}]` : bodyToSend}`);

  return fetch(url, {method, body: bodyToSend, headers: options.headers, agent})
    .then(res => {
      print(`${res.status} ${res.statusText}`);
      if (res.status >= 200 && res.status < 300) {
        return new Promise((resolve, reject) => {
          if (options.writeStream) {
            res.body.pipe(options.writeStream);
            return resolve();
          }

          let fetched = Buffer.alloc(0);
          res.body.on('data', data => {
            if (data) {
              print(`Already retrieved: ${fetched.length}, newly retrieved: ${data.length}`);
              fetched = Buffer.concat([fetched, data]);
            }
          }).on('end', () => {
            const contentType = res.headers.get('Content-Type');
            print(`Done: fetched length = ${fetched.length}, Content-Type = ${contentType}`);
            if (contentType.trim().startsWith('application/json')) {
              tryCatch(
                () => {
                  resolve(JSON.parse(fetched.toString()));
                },
                () => {
                  resolve({});
                }
              );
            } else if (contentType.trim().startsWith('application/xml')) {
              resolve(fetched.toString());
            }

            resolve(fetched);
          }).on('error', err => {
            reject(err);
          });
        });
      }

      res.text().then(msg => print(`Error: ${res.status} ${res.statusText} ${msg}`));
      THROW(new Error(`Response: ${res.status} ${res.statusText}`));
    }).then(body => {
      print(body);
      return body;
    });
}

module.exports = {
  ParallelStream
};
