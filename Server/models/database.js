const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Database = sequelize.define('_jsrs_databases', {
  name: Sequelize.STRING,
  host: Sequelize.STRING,
  port: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  database_name: Sequelize.STRING
})

exports.model = Database
exports.sequelize = sequelize
