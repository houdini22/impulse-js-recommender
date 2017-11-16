const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment')
const md5 = require('md5')

const DB = require('../modules/database-new/connection')
const db = DB.getLocalConnection()
const FileModel = require('../models/file').model

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

router.post('/create_snapshot', async (req, res) => {
  db.then(({ insert }) => {
    const data = req.body
    data.date_added = moment().format('YYYY-MM-DD HH:mm:ss')
    data.items_field_pk = 'id'
    data.rated_by_field_pk = 'id'

    insert('_jsrs_indexes', data).then(() => {
      res.json({
        status: 'OK'
      })
    })
  })
})

router.get('/get_indexes', async (req, res) => {
  db.then(({ query }) => {
    query('SELECT * FROM _jsrs_indexes').then((data) => {
      res.json({
        data
      })
    })
  })
})

router.post('/build_index', async (req, res) => {
  const data = req.body
  db.then(({ query }) => {
    query('UPDATE _jsrs_indexes SET is_built = 1 WHERE id = ?', [data.index_id]).then(() => {
      res.json({
        status: 'OK'
      })
    })
  })
})

router.delete('/delete/:id', async (req, res) => {
  db.then(({ query }) => {
    query('DELETE FROM _jsrs_indexes WHERE id = ?', [req.params.id]).then(() => {
      res.json({
        status: 'OK'
      })
    })
  })
})

router.post('/upload', async (req, res) => {
  const file = req.files.file
  const fileName = md5(file.name + Math.random() + (new Date()).getTime())

  FileModel.create({
    name: file.name,
    file_name: fileName,
    user_id: 1
  }).then((createdFile) => {
    file.mv(`./../data/files/${fileName}`)

    res.json({
      status: 'OK',
      data: {
        id: createdFile.id,
        name: createdFile.get('name')
      }
    })
  })
})

exports.router = router
