const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Database = sequelize.define('_jsrs_databases', {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  host: Sequelize.STRING,
  port: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  databaseName: Sequelize.STRING,
  status: Sequelize.STRING,
})

exports.model = Database
exports.sequelize = sequelize
