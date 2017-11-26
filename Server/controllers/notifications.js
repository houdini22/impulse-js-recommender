const express = require('express')
const router = express.Router()

const QueueModel = require('../models/queue').model
const { getUserFromRequest } = require('../helpers')

router.get('/', async (req, res) => {
  //const user = await getUserFromRequest(req)

  Promise.all([
    new Promise((resolve) => {
      QueueModel.findAll({
        where: {
          userId: 1,
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
          userId: 1,
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
          userId: 1,
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
          read: (countAwaiting > 0 || countRunning > 0 || countEnded > 0)
        }
      }
    })
  })
})

exports.router = router
