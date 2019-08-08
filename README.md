[![Build Status](https://travis-ci.org/kuu/elemental-api.svg?branch=master)](https://travis-ci.org/kuu/elemental-api)
[![Coverage Status](https://coveralls.io/repos/github/kuu/elemental-api/badge.svg?branch=master)](https://coveralls.io/github/kuu/elemental-api?branch=master)
[![Dependency Status](https://david-dm.org/kuu/elemental-api.svg)](https://david-dm.org/kuu/elemental-api)
[![Development Dependency Status](https://david-dm.org/kuu/elemental-api/dev-status.svg)](https://david-dm.org/kuu/elemental-api#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/kuu/elemental-api/badge.svg)](https://snyk.io/test/github/kuu/elemental-api)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

# elemental-api
Node client library and CLI to access REST APIs on AWS Elemental appliances & software

## Install
[![NPM](https://nodei.co/npm/elemental-api.png?mini=true)](https://nodei.co/npm/elemental-api/)

## API

### Usage
```
const ElementalApi = require('elemental-api');

const api = new ElementalApi('192.168.0.99', 'john', 'ZSe9F1JmSeqKbJax7Jv');

// GET
api.get('/nodes')
.then((body) => {
  // XML text
})
.catch((err) => {
  // Error response
});
```

### `constructor(host, user, pass[, options])`
Creates a new `ElementalApi` object.

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| host    | string | Yes      | N/A     | Appliance's host address (FQDN or IP addr) |
| user    | string | Yes      | N/A     | Your login user name |
| pass    | string | Yes      | N/A     | Your secret API key |
| options | object | No       | {}      | See below |

#### options
| Name           | Type    | Default | Description                       |
| -------------- | ------- | ------- | --------------------------------- |
| secure         | boolean | false   | If true, the library sends https request |
| expirationTime | number  | 3600    | TTL period for each API call  |
| concurrency    | number  | 5       | Limits the number of concurrent API calls. The valid range is 1~10 |

#### return value
An instance of `ElementalApi`.

### `get(path[, params, options])`
Send a [GET] request

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| path    | string | Yes      | N/A     | path part of API call  |
| params  | object | No       | {}      | An object that holds key=value pairs of query string |
| options | object | No       | {}      | See `node-fetch`'s [options](https://www.npmjs.com/package/node-fetch#options) |

#### return value
A `Promise` object that resolves with return value

### `post(path[, params, body, options])`
Send a [POST] request

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| path    | string | Yes      | N/A     | path part of API call  |
| params  | object | No       | {}      | An object that holds key=value pairs of query string |
| body    | string/Buffer/object | No       | {}      | Data to send |
| options | object | No       | {}      | See `node-fetch`'s [options](https://www.npmjs.com/package/node-fetch#options) |

#### return value
A `Promise` object that resolves with return value

### `put(path[, params, body, options])`
Send a [PUT] request

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| path    | string | Yes      | N/A     | path part of API call  |
| params  | object | No       | {}      | An object that holds key=value pairs of query string |
| body    | string/Buffer/object | No       | {}      | Data to send |
| options | object | No       | {}      | See `node-fetch`'s [options](https://www.npmjs.com/package/node-fetch#options) |

#### return value
A `Promise` object that resolves with return value

### `delete(path[, params, options])`
Send a [DELETE] request

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| path    | string | Yes      | N/A     | path part of API call  |
| params  | object | No       | {}      | An object that holds key=value pairs of query string |
| options | object | No       | {}      | See `node-fetch`'s [options](https://www.npmjs.com/package/node-fetch#options) |

#### return value
A `Promise` object that resolves with return value


## Configure (for CLI)
Put a config file in your work directory

```
 $ mkdir config
 $ vi config/default.json
 {
   "host":          "xxxx.cloud.elementaltechnologies.com",
   "secure": true,
   "auth": {
     "user":        "Your login user name",
     "api_key":     "Your secret API key"
   }
 }
```

## CLI
```
Usage:
    ele [options] command [parameters]
Options:
  -h, --help    Print help
  -v, --version Print version
Commands:
  raw             Directly calls REST API
Syntax:
  oo raw method path body
Example:
  ele -h
  ele -v
  ele raw get /nodes
Parameters:
  method        HTTP method (GET/POST/PUT/DELETE)
  path          Path starts with '/'
  body          HTTP request body
```
