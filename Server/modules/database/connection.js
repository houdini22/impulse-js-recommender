const mysql = require('mysql')
const config = require('../../config').config.database

const connection = mysql.createConnection(config)

exports.connect = () => {
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        reject(err.stack)
        return
      }
      resolve()
    })
  })
}

exports.connection = connection
