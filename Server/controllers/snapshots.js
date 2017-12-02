const express = require('express')
const router = express.Router()

const DB = require('../modules/database-new/connection')
const FileModel = require('../models/file').model
const SnapshotModel = require('../models/snapshot').model
const NotificationModel = require('../models/notification').model
const QueueModel = require('../models/queue').model
const SnapshotStatus = require('../modules/SnapshotStatus')
const QueueStatus = require('../modules/QueueStatus')
const { getUserFromRequest } = require('../helpers')

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
  const user = await getUserFromRequest(req)

  if (data.fileId) {
    FileModel.findOne({
      where: {
        id: data.fileId,
        userId: user.id,
      }
    }).then((file) => {
      if (file) {
        data.fileId = file.id
        data.status = SnapshotStatus.status.CREATED
        data.userId = user.id
        SnapshotModel.create(data).then((snapshot) => {
          res.json({
            status: 'OK'
          })
        })
      }
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
  const user = await getUserFromRequest(req)
  const page = req.query.page ? Number(req.query.page) : 0
  const limit = 10
  const offset = page * limit

  Promise.all([
    new Promise((resolve) => {
      SnapshotModel.findAll({
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
      SnapshotModel.count({
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

router.post('/build_index', async (req, res) => {
  const user = await getUserFromRequest(req)

  SnapshotModel.findOne({
    where: {
      id: req.body.id,
      userId: user.id
    }
  }).then((snapshot) => {
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
              userId: snapshot.get('userId'),
              snapshotId: snapshot.id,
              fileId: snapshot.get('fileId'),
              status: QueueStatus.status.CREATED,
            }).then((queue) => {
              NotificationModel.create({
                type: 'ADDED_TO_QUEUE',
                userId: snapshot.get('userId'),
                queueId: queue.id
              }).then(() => resolve())
            })
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
