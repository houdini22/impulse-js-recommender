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
  DB.getRemoteConnection(req.query.databaseId).then(({ query }) => {
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
  DB.getRemoteConnection(req.query.databaseId).then(({ query }) => {
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
  if (data.fileToken) {
    FileModel.findOne({
      where: {
        token: data.fileToken
      }
    }).then((file) => {
      data.fileId = file.id
      data.status = SnapshotStatus.status.CREATED
      delete data.fileToken
      SnapshotModel.create(data).then((snapshot) => {
        res.json({
          status: 'OK'
        })
      })
    })
  } else {
    data.itemsFieldPk = 'id'
    data.ratedByFieldPk = 'id'
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
      if (snapshot.get('fileId') && snapshot.get('status') !== SnapshotStatus.status.ADDED_TO_QUEUE) {
        return Promise.all([
          new Promise((resolve) => {
            snapshot.update({
              status: SnapshotStatus.status.ADDED_TO_QUEUE
            }).then(() => resolve())
          }),
          new Promise((resolve) => {
            QueueModel.create({
              type: 'BUILD_INDEX',
              indexId: snapshot.id,
              fileId: snapshot.get('fileId'),
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

exports.router = router
