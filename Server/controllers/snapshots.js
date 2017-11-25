const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const md5 = require('md5')
const Papa = require('papaparse')
const fs = require('fs')

const DB = require('../modules/database-new/connection')
const FileModel = require('../models/file').model
const SnapshotModel = require('../models/snapshot').model
const SnapshotStatus = require('../modules/SnapshotStatus')
const QueueModel = require('../models/queue').model
const QueueStatus = require('../modules/QueueStatus')

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
  if (data.file_token) {
    FileModel.findOne({
      where: {
        token: data.file_token
      }
    }).then((file) => {
      data.file_id = file.id
      data.status = SnapshotStatus.status.CREATED
      delete data.file_token
      SnapshotModel.create(data).then((snapshot) => {
        res.json({
          status: 'OK'
        })
      })
    })
  } else {
    data.items_field_pk = 'id'
    data.rated_by_field_pk = 'id'
    SnapshotModel.create(data).then(() => {
      res.json({
        status: 'OK'
      })
    })
  }
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
      if (snapshot.get('file_id') && snapshot.get('status') !== SnapshotStatus.status.ADDED_TO_QUEUE) {
        return Promise.all([
          new Promise((resolve) => {
            snapshot.update({
              status: SnapshotStatus.status.ADDED_TO_QUEUE
            }).then(() => resolve())
          }),
          new Promise((resolve) => {
            QueueModel.create({
              type: 'BUILD_INDEX',
              file_id: snapshot.get('file_id'),
              status: QueueStatus.status.CREATED,
            }).then(() => resolve())
          })
        ]).then(() => {
          res.json({
            status: 'OK'
          })
        })
      }
    }
    res.json({
      status: 'ERR'
    })
  })
})

router.delete('/:id', async (req, res) => {
  SnapshotModel.findById(req.params.id).then((snapshot) => {
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
