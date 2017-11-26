const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Database = sequelize.define('database', {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  host: Sequelize.STRING,
  port: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  databaseName: Sequelize.STRING,
  status: Sequelize.STRING,
  userId: Sequelize.INTEGER,
})

exports.model = Database
exports.sequelize = sequelize
