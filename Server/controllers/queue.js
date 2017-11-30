const express = require('express')
const router = express.Router()

const DB = require('../modules/database-new/connection')
const QueueModel = require('../models/queue').model
const { getUserFromRequest } = require('../helpers')

router.get('/finished', async (req, res) => {
  const user = await getUserFromRequest(req)
  const page = req.query.page ? Number(req.query.page) : 0
  const limit = 10
  const offset = page * limit

  Promise.all([
    new Promise((resolve) => {
      QueueModel.findAll({
        where: {
          userId: user.id,
          status: 'ENDED'
        },
        limit,
        offset,
        order: [['id', 'DESC']]
      }).then((tasks) => {
        resolve(tasks)
      })
    }),
    new Promise((resolve) => {
      QueueModel.count({
        where: {
          userId: user.id,
          status: 'ENDED'
        }
      }).then((count) => {
        resolve(count)
      })
    })
  ]).then(([tasks, count]) => {
    res.json({
      data: tasks,
      pagination: {
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit
      }
    })
  })
})

router.get('/running', async (req, res) => {
  const user = await getUserFromRequest(req)
  const page = req.query.page ? Number(req.query.page) : 0
  const limit = 10
  const offset = page * limit

  Promise.all([
    new Promise((resolve) => {
      QueueModel.findAll({
        where: {
          userId: user.id,
          status: 'RUNNING'
        },
        limit,
        offset,
        order: [['id', 'DESC']]
      }).then((tasks) => {
        resolve(tasks)
      })
    }),
    new Promise((resolve) => {
      QueueModel.count({
        where: {
          userId: user.id,
          status: 'RUNNING'
        }
      }).then((count) => {
        resolve(count)
      })
    })
  ]).then(([tasks, count]) => {
    res.json({
      data: tasks,
      pagination: {
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit
      }
    })
  })
})

router.get('/awaiting', async (req, res) => {
  const user = await getUserFromRequest(req)

  QueueModel.findAll({
    where: {
      userId: user.id,
      status: 'CREATED'
    }
  }).then((tasks) => {
    res.json({
      data: tasks
    })
  })
})

router.get('/time_summary', async (req, res) => {
  const user = await getUserFromRequest(req)

  Promise.all([
    new Promise((resolve) => {
      QueueModel.sum('executionTime', {
        where: {
          userId: user.id
        }
      }).then((sum) => {
        resolve(sum)
      })
    })
  ]).then(([sum]) => {
    res.json({
      data: {
        sum
      }
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
