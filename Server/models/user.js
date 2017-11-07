const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const User = sequelize.define('_jsrs_users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
})

exports.model = User
exports.sequelize = sequelize
