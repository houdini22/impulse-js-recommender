const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Queue = sequelize.define('_jsrs_queues', {
  type: Sequelize.STRING,
  fileId: Sequelize.INTEGER,
  databaseId: Sequelize.INTEGER,
})

exports.model = Queue
exports.sequelize = sequelize
