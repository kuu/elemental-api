const ElementalApi = require('../lib');

module.exports = function (config, arg) {
  const api = new ElementalApi(config.host, config.auth.user, config.auth.api_key, {expirationTime: arg.expiration || config.period, concurrency: 6});
  return require(`./command/${arg._[0]}`)(api, arg._.slice(1), arg);
};
