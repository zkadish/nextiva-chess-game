const config = require('../config/db.json');
const { Pool } = require('pg');

const pool = new Pool(config.env);

module.exports = {
  query: async (text, params) => {
    return new Promise(resolve =>
      pool.query(text, params, (err, data) => resolve(Object.assign({}, {err}, data))));
  }
};
