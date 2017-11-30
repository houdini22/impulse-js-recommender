const express = require('express')
const router = express.Router()

const DB = require('../modules/database-new/connection')
const DatabaseModel = require('../models/database').model
const { getUserFromRequest } = require('../helpers')

router.get('/', async (req, res) => {
  const user = await getUserFromRequest(req)
  const page = req.query.page ? Number(req.query.page) : 0
  const limit = 10
  const offset = page * limit

  Promise.all([
    new Promise((resolve) => {
      DatabaseModel.findAll({
        where: {
          userId: user.id
        },
        limit,
        offset,
        order: [['id', 'DESC']]
      }).then((files) => {
        resolve(files)
      })
    }),
    new Promise((resolve) => {
      DatabaseModel.count({
        where: {
          userId: user.id
        }
      }).then((count) => {
        resolve(count)
      })
    })
  ]).then(([files, count]) => {
    res.json({
      data: files,
      pagination: {
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit
      }
    })
  })
})

router.post('/', async (req, res) => {
  const user = await getUserFromRequest(req)
  const data = req.body

  let status = false
  await DB.testConnection(data).then(() => {
    status = true
  })

  data.status = status ? 'online' : 'offline'
  data.userId = user.id

  DatabaseModel.create(data).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.put('/', async (req, res) => {
  const user = await getUserFromRequest(req)
  const data = req.body

  let status = false
  await DB.testConnection(data).then(() => {
    status = true
  }).catch(() => {
    status = false
  })

  data.status = status ? 'online' : 'offline'
  data.userId = user.id

  DatabaseModel.update(data, {
    where: {
      id: data.id
    }
  }).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.delete('/:id', async (req, res) => {
  const user = await getUserFromRequest(req)

  DatabaseModel.findOne({
    id: req.params.id,
    userId: user.id
  }).then((database) => {
    database.destroy().then(() => {
      res.json({
        status: 'OK'
      })
    })
  })
})

router.post('/test', async (req, res) => {
  const data = req.body
  DB.testConnection(data).then(() => {
    res.json({
      status: 'OK',
      message: ''
    })
  }).catch((err) => {
    res.status(401)
    res.json({
      status: 'ERR',
      message: err.parent && err.parent.message ? err.parent.message : 'Unknown error.'
    })
  })
})

exports.router = router
