const connection = require('./connection').connection;

const insert = (tableName, values) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO ${tableName} SET `
    const queryParams = [];
    const params = Object.keys(values).map((key, i) => {
      queryParams.push(`\`${key}\` = ?`);
      return values[key];
    });
    connection.query(`${query}${queryParams.join(', ')}`, params, function (error, results, fields) {
      if (error) {
        reject(error);
        return;
      }

      resolve(results, fields);
    });
  })
};

const query = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    })
  });
};

exports.insert = insert;
exports.query = query;
