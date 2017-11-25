const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const File = sequelize.define('_jsrs_files', {
  name: Sequelize.STRING,
  fileName: Sequelize.STRING,
  format: Sequelize.STRING,
  token: Sequelize.STRING,
  hasHeaderRow: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  indexId: Sequelize.INTEGER,
})

exports.model = File
exports.sequelize = sequelize
