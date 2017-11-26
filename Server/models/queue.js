const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const SnapshotModel = require('./snapshot').model
const FileModel = require('./file').model

const Queue = sequelize.define('queue', {
  type: Sequelize.STRING,
  snapshotId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  fileId: Sequelize.INTEGER,
  databaseId: Sequelize.INTEGER,
  status: Sequelize.ENUM('CREATED', 'RUNNING', 'ENDED'),
})

Queue.belongsTo(SnapshotModel)
Queue.belongsTo(FileModel)

exports.model = Queue
exports.sequelize = sequelize
