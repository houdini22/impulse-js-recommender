const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const File = sequelize.define('_jsrs_files', {
  name: Sequelize.STRING,
  file_name: Sequelize.STRING,
  format: Sequelize.STRING,
  token: Sequelize.STRING,
  has_header_row: Sequelize.BOOLEAN,
  user_id: Sequelize.INTEGER,
  index_id: Sequelize.INTEGER,
})

exports.model = File
exports.sequelize = sequelize
