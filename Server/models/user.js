const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  lastAction: Sequelize.DATE,
})

exports.model = User
exports.sequelize = sequelize
