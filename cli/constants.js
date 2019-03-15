const pkg = require('../package.json');

const VERSION = `v${pkg.version}`;

const CONFIG = `
Please put config file(s) in your work directory.
 $ mkdir config
 $ vi config/default.json
 {
   "auth": {
     "user":        "Your Elemental User Name,
     "api_key":     "Your Elemental API Key"
   }
 }
`;

const HELP = `
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
`;

module.exports = {
  VERSION,
  CONFIG,
  HELP
};
