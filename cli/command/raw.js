function makeRequest(api, parameters) {
  const [method, path, body] = parameters;
  return Promise.resolve(api[method.toLowerCase()](path, {}, body));
}

module.exports = makeRequest;
