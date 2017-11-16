const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment')
const md5 = require('md5')
const Papa = require('papaparse')
const fs = require('fs')

const DB = require('../modules/database-new/connection')
const db = DB.getLocalConnection()
const FileModel = require('../models/file').model
const SnapshotModel = require('../models/snapshot').model

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(bodyParser.text())

router.get('/get_tables', async (req, res) => {
  DB.getRemoteConnection(req.query.database_id).then(({ query }) => {
    query('SHOW TABLES').then((result) => {
      const tables = []
      result.forEach((row) => {
        const tableName = row[Object.keys(row)[0]]
        if (tableName.indexOf('_jsrs_') === -1) {
          tables.push(tableName)
        }
      })
      res.json({
        data: tables
      })
    })
  })
})

router.get('/get_rating_fields', async (req, res) => {
  DB.getRemoteConnection(req.query.database_id).then(({ query }) => {
    query(`SHOW COLUMNS FROM ${req.query.table_name}`).then((result) => {
      const fields = []
      result.forEach((row) => {
        fields.push(row.Field)
      })
      res.json({
        data: fields
      })
    })
  })
})

router.post('/', async (req, res) => {
  const data = req.body
  const fileId = await FileModel.findOne({
    where: {
      token: data.file_token
    }
  }).id

  data.file_id = fileId
  data.items_field_pk = 'id'
  data.rated_by_field_pk = 'id'
  delete data.file_token

  SnapshotModel.create(data).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.get('/', async (req, res) => {
  SnapshotModel.findAll({
    where: {}
  }).then((snapshots) => {
    res.json({
      data: snapshots
    })
  })
})

router.post('/build_index', async (req, res) => {
  SnapshotModel.findById(req.body.id).then((snapshot) => {
    if (snapshot) {
      snapshot.update({
        is_built: 1
      }).then(() => {
        res.json({
          status: 'OK'
        })
      })
    }
  })
})

router.delete('/:id', async (req, res) => {
  SnapshotModel.findById(req.params.id).then((snapshot) => {
    if (snapshot) {
      snapshot.destroy().then(() => {
        res.json({
          status: 'OK'
        })
      })
    }
  })
})

router.post('/upload', async (req, res) => {
  const file = req.files.file
  const fileName = md5(file.name + Math.random() + (new Date()).getTime())
  const data = req.body

  FileModel.create({
    name: file.name,
    file_name: fileName,
    user_id: 1,
    format: data.format,
    token: md5(fileName + Math.random() + (new Date()).getTime())
  }).then((createdFile) => {
    file.mv(`./../data/files/${fileName}`)
    res.json({
      status: 'OK',
      data: {
        token: createdFile.get('token'),
        name: createdFile.get('name'),
        format: createdFile.get('format')
      }
    })
  })
})

router.get('/get_file_info', async (req, res) => {
  FileModel.findOne({
    where: {
      token: req.query.token
    }
  }).then((file) => {
    const filePath = `./../data/files/${file.file_name}`
    const content = fs.readFileSync(filePath, 'utf-8')
    Papa.parse(content, {
      complete: function (results) {
        res.json({
          status: 'OK',
          data: {
            firstRows: results.data.slice(0, 10),
            fields: results.meta.fields,
          }
        })
      }
    })
  })
})

exports.router = router
