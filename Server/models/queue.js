const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Queue = sequelize.define('_jsrs_queues', {
  type: Sequelize.STRING,
  file_id: Sequelize.INTEGER,
  database_id: Sequelize.INTEGER,
})

exports.model = Queue
exports.sequelize = sequelize
