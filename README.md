# elemental-api
Node client library and CLI to access REST APIs on Elemental services

## Install
You need `git` and `Node.js` installed

```
$ git clone https://github.com/kuu/elemental-api.git
$ cd elemental-api
$ npm install
```

## Configure
Put a config file in your work directory.

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

## API

```
const ElementalApi = require('elemental-api');

const api = new ElementalApi('/path/to/endpoint', 'Your login user name', 'Your secret API key');

// GET
api.get('/nodes', 'john', 'ZSe9F1JmSeqKbJax7Jv')
.then((body) => {
  // XML text
})
.catch((err) => {
  // Error response
});
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
  oo -h
  oo -v
  oo raw PUT https://xxx/api/jobs
Parameters:
  method        HTTP method (GET/POST/PUT/DELETE)
  path          Path starts with '/'
  body          HTTP request body
```
