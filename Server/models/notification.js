const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const QueueModel = require('./queue').model
const UserModel = require('./user').model

const Notification = sequelize.define('notification', {
  type: Sequelize.STRING,
  isRead: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  queueId: Sequelize.INTEGER,
})

Notification.belongsTo(UserModel)
Notification.belongsTo(QueueModel)

exports.model = Notification
exports.sequelize = sequelize
