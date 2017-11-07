const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

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
  DatabaseModel.create(data).then(() => {
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

exports.router = router
