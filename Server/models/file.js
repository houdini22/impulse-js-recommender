const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const File = sequelize.define('_jsrs_files', {
  name: Sequelize.STRING,
  file_name: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
  index_id: Sequelize.INTEGER,
})

exports.model = File
exports.sequelize = sequelize
