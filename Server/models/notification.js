const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const QueueModel = require('./queue').model
const UserModel = require('./user').model

const Notification = sequelize.define('notification', {
  type: Sequelize.STRING,
  isRead: Sequelize.BOOLEAN,
  isSent: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  queueId: Sequelize.INTEGER,
})

Notification.belongsTo(UserModel)
Notification.belongsTo(QueueModel)

const notificationToQueueMap = (notifications) => {
  const result = {}
  notifications.forEach((notification) => {
    const queueId = notification.get('queueId')
    if (!result[queueId]) {
      result[queueId] = 0
    }
    result[queueId]++
  })
  return result
}

const queueMapSum = (map) => {
  let result = 0
  Object.keys(map).forEach((queueId) => {
    result += map[queueId]
  })
  return result
}

const getUserNotifications = (user) => {
  return new Promise((resolve) => {
    Promise.all([
      new Promise((resolve) => {
        Notification.findAll({
          where: {
            userId: user.id,
            isRead: false,
            type: 'ADDED_TO_QUEUE'
          }
        }).then((notifications) => {
          resolve(notifications)
        })
      }),
      new Promise((resolve) => {
        Notification.findAll({
          where: {
            userId: user.id,
            isRead: false,
            type: 'QUEUE_RUNNED'
          }
        }).then((notifications) => {
          resolve(notifications)
        })
      }),
      new Promise((resolve) => {
        Notification.findAll({
          where: {
            userId: user.id,
            isRead: false,
            type: 'QUEUE_ENDED'
          }
        }).then((notifications) => {
          resolve(notifications)
        })
      })
    ]).then(([addedToQueue, running, finished]) => {
      const mapAddedToQueue = notificationToQueueMap(addedToQueue)
      const mapRunning = notificationToQueueMap(running)
      const mapFinished = notificationToQueueMap(finished)

      Object.keys(mapAddedToQueue).forEach((queueId) => {
        if (mapRunning[queueId]) {
          mapAddedToQueue[queueId] -= mapRunning[queueId]
        }
      })
      Object.keys(mapRunning).forEach((queueId) => {
        if (mapFinished[queueId]) {
          mapRunning[queueId] -= mapFinished[queueId]
        }
      })

      const addedToQueueValue = queueMapSum(mapAddedToQueue)
      const runningValue = queueMapSum(mapRunning)
      const finishedValue = queueMapSum(mapFinished)

      resolve({
        notifications: {
          awaiting: {
            value: addedToQueueValue
          },
          running: {
            value: runningValue
          },
          finished: {
            value: finishedValue
          }
        },
        read: (!(addedToQueueValue > 0 || runningValue > 0 || finishedValue > 0))
      })
    })
  })
}

exports.model = Notification
exports.sequelize = sequelize
exports.getUserNotifications = getUserNotifications
