const pkg = require('../package.json');

const VERSION = `v${pkg.version}`;

const CONFIG = `
Please put config file(s) in your work directory.
$ mkdir config
$ vi config/default.json
{
  "host":          "xxxx.cloud.elementaltechnologies.com",
  "secure":        true,
  "auth": {
    "user":        "Your login user name",
    "api_key":     "Your secret API key"
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
  ele raw method path body
Example:
  ele -h
  ele -v
  ele raw get /nodes
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
