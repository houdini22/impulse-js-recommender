const express = require('express')
const router = express.Router()

const DB = require('../modules/database-new/connection')
const DatabaseModel = require('../models/database').model

router.get('/', async (req, res) => {
  DatabaseModel.findAll().then((databases) => {
    res.json({
      data: databases
    })
  })
})

router.post('/', async (req, res) => {
  const data = req.body

  let status = false
  await DB.testConnection(data).then(() => {
    status = true
  }).catch(() => {
    status = false
  })
  data.status = status ? 'online' : 'offline'

  DatabaseModel.create(data).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.put('/', async (req, res) => {
  const data = req.body

  let status = false
  await DB.testConnection(data).then(() => {
    status = true
  }).catch(() => {
    status = false
  })
  data.status = status ? 'online' : 'offline'

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
  DatabaseModel.findById(req.params.id).then((database) => {
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
