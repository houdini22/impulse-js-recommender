const express = require('express')
const router = express.Router()

const DB = require('../modules/database-new/connection')
const QueueModel = require('../models/queue').model
const { getUserFromRequest } = require('../helpers')

router.get('/', async (req, res) => {
  const user = await getUserFromRequest(req)

  QueueModel.findAll({
    where: {
      userId: user.id
    }
  }).then((snapshots) => {
    res.json({
      data: snapshots
    })
  })
})

router.delete('/:id', async (req, res) => {
  const user = await getUserFromRequest(req)

  QueueModel.findOne({
    where: {
      id: req.params.id,
      userId: user.id
    }
  }).then((snapshot) => {
    if (snapshot) {
      Promise.all([
        new Promise((resolve) => {
          snapshot.destroy().then(() => resolve())
        }),
      ]).then(() => {
        res.json({
          status: 'OK'
        })
      })
    }
  })
})

exports.router = router
