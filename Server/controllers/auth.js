const express = require('express')
const router = express.Router()
const md5 = require('md5')

const UserModel = require('../models/user').model
const QueueModel = require('../models/queue').model

router.post('/login', async (req, res) => {
  const data = req.body
  UserModel.findOne({
    where: {
      username: data.username,
      password: UserModel.sequelize.where(UserModel.sequelize.fn('MD5', data.password), UserModel.sequelize.col('password'))
    }
  }).then((user) => {
    if (user) {
      user.update({
        token: md5((new Date()).getTime() + user.id)
      }).then(() => {

        Promise.all([
          new Promise((resolve) => {
            QueueModel.findAll({
              where: {
                userId: user.id,
                notificationIsRead: false,
                status: 'CREATED'
              }
            }).then((queues) => {
              resolve(queues.length)
            })
          }),
          new Promise((resolve) => {
            QueueModel.findAll({
              where: {
                userId: user.id,
                notificationIsRead: false,
                status: 'RUNNING'
              }
            }).then((queues) => {
              resolve(queues.length)
            })
          }),
          new Promise((resolve) => {
            QueueModel.findAll({
              where: {
                userId: user.id,
                notificationIsRead: false,
                status: 'ENDED'
              }
            }).then((queues) => {
              resolve(queues.length)
            })
          })
        ]).then(([countAwaiting, countRunning, countEnded]) => {
          res.json({
            data: {
              notifications: {
                notifications: {
                  awaiting: {
                    value: countAwaiting
                  },
                  running: {
                    value: countRunning,
                  },
                  finished: {
                    value: countEnded
                  }
                },
                read: (!(countAwaiting > 0 || countRunning > 0 || countEnded > 0))
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
