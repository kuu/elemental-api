const utils = {
  THROW(err) {
    throw err;
  },

  tryCatch(body, errorHandler) {
    try {
      return body();
    } catch (err) {
      return errorHandler(err);
    }
  },

  stringify(data) {
    let str;
    try {
      str = JSON.stringify(data);
    } catch (err) {
      console.error(err.stack);
      str = '';
    }

    return str;
  }
};

module.exports = utils;
