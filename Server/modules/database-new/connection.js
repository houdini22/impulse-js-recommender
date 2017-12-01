const mysql = require('mysql')
const Sequelize = require('sequelize')

const createConnection = (config) => {
  const connection = mysql.createConnection(config)
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        reject(err.stack)
        return
      }

      const insert = (tableName, values) => {
        return new Promise((resolve, reject) => {
          let query = `INSERT INTO ${tableName} SET `
          const queryParams = []
          const params = Object.keys(values).map((key, i) => {
            queryParams.push(`\`${key}\` = ?`)
            return values[key]
          })
          connection.query(`${query}${queryParams.join(', ')}`, params, function (error, results, fields) {
            if (error) {
              reject(error)
              return
            }

            resolve(results, fields)
          })
        })
      }

      const query = (query, params = []) => {
        return new Promise((resolve, reject) => {
          connection.query(query, params, (error, results) => {
            if (error) {
              reject(error)
              return
            }
            resolve(results)
          })
        })
      }

      resolve({
        insert,
        query,
      })
    })
  })
}

const createLocalConnection = () => {
  const config = require('../../config').config.database
  return createConnection(config)
}

const getRemoteConnection = (databaseId) => {
  return new Promise((resolve, reject) => {
    const local = getLocalConnection()
    local.then(({ query }) => {
      query('SELECT * FROM _jsrs_databases WHERE id = ?', [databaseId]).then((results) => {
        if (results[0]) {
          const config = results[0]

          config.database = config.databaseName
          config.user = config.username

          delete config.databaseName
          delete config.username

          const connection = createConnection(config)
          connection.then((proxy) => {
            resolve(proxy)
          })
        }
      })
    })
  })
}

exports.createConnection = createConnection
exports.getRemoteConnection = getRemoteConnection
exports.createLocalConnection = createLocalConnection

let localConnection = null
const getLocalConnection = () => {
  if (!localConnection) {
    localConnection = createLocalConnection()
  }
  return localConnection
}
exports.getLocalConnection = getLocalConnection

const createSequelizeConnection = () => {
  const config = require('../../config').config.database
  const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
  })
  return sequelize
}
exports.createSequelizeConnection = createSequelizeConnection

let sequelizeConnection = null
const getSequelizeConnection = () => {
  if (!sequelizeConnection) {
    sequelizeConnection = createSequelizeConnection()
  }
  return sequelizeConnection
}
exports.getSequelizeConnection = getSequelizeConnection

const testConnection = (params) => {
  return new Promise((resolve, reject) => {
    const sequelize = new Sequelize(params.databaseName, params.username, params.password, {
      host: params.host,
      dialect: params.type,
      port: params.port
    })
    sequelize
      .authenticate()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
exports.testConnection = testConnection
