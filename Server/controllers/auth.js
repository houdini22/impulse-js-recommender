const express = require('express')
const router = express.Router()
const md5 = require('md5')

const UserModel = require('../models/user').model
const QueueModel = require('../models/queue').model
const NotificationModel = require('../models/notification').model

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

router.post('/login', async (req, res) => {
  const data = req.body
  UserModel.findOne({
    where: {
      username: data.username,
      password: UserModel.sequelize.where(
        UserModel.sequelize.fn('MD5', data.password), UserModel.sequelize.col('password')
      )
    }
  }).then((user) => {
    if (user) {
      user.update({
        token: md5((new Date()).getTime() + user.id)
      }).then(() => {
        Promise.all([
          new Promise((resolve) => {
            NotificationModel.findAll({
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
            NotificationModel.findAll({
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
            NotificationModel.findAll({
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

          res.json({
            data: {
              notifications: {
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
              },
              user: {
                username: user.username,
                token: user.token
              }
            }
          })
        })
      })
    } else {
      res.status(401)
      res.json({
        status: 'ERR'
      })
    }
  })
})

exports.router = router
