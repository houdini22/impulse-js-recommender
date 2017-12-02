const express = require('express')
const router = express.Router()
const fs = require('fs')
const Papa = require('papaparse')
const md5 = require('md5')

const DB = require('../modules/database-new/connection')
const FileModel = require('../models/file').model
const { getUserFromRequest } = require('../helpers')

router.get('/get_file_info/:id', async (req, res) => {
  const user = await getUserFromRequest(req)

  FileModel.findOne({
    where: {
      id: req.params.id,
      userId: user.id
    }
  }).then((file) => {
    if (file) {
      const filePath = `./../data/files/${file.id}`
      const content = fs.readFileSync(filePath, 'utf-8')
      return Papa.parse(content, {
        complete: function (results) {
          let firstRows

          if (req.query.snapshot && file.get('hasHeaderRow')) {
            firstRows = results.data.slice(1, 11)
          } else {
            firstRows = results.data.slice(0, 10)
          }

          res.json({
            status: 'OK',
            data: {
              firstRows,
              fields: results.meta.fields,
            }
          })
        }
      })
    }
    return res.json({
      status: 'ERR'
    })
  })
})

router.post('/upload', async (req, res) => {
  const file = req.files.file
  const data = req.body
  const user = await getUserFromRequest(req)

  FileModel.create({
    name: file.name,
    userId: user.id,
    format: data.format,
    hasHeaderRow: true,
  }).then((createdFile) => {
    file.mv(`./../data/files/${createdFile.id}`)
    res.json({
      status: 'OK',
      data: {
        id: createdFile.id,
        name: createdFile.get('name'),
        format: createdFile.get('format')
      }
    })
  })
})

router.get('/paginate', async (req, res) => {
  const user = await getUserFromRequest(req)
  const page = req.query.page ? Number(req.query.page) : 0
  const limit = 10
  const offset = page * limit

  Promise.all([
    new Promise((resolve) => {
      FileModel.findAll({
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
      FileModel.count({
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

router.get('/:id', async (req, res) => {
  const user = await getUserFromRequest(req)

  FileModel.findOne({
    where: {
      id: req.params.id,
      userId: user.id
    }
  }).then((file) => {
    if (file) {
      return res.json({
        data: file,
      })
    }
    return res.json({
      status: 'ERR'
    })
  })
})

router.delete('/:id', async (req, res) => {
  const user = await getUserFromRequest(req)

  FileModel.findOne({
    where: {
      id: req.params.id,
      userId: user.id
    }
  }).then((file) => {
    if (file) {
      return Promise.all([
        new Promise((resolve) => {
          file.destroy().then(() => resolve())
        })
      ]).then(() => {
        res.json({
          status: 'OK'
        })
      })
    }
    return res.json({
      status: 'ERR'
    })
  })
})

router.put('/:id', async (req, res) => {
  const user = await getUserFromRequest(req)

  FileModel.findOne({
    where: {
      id: req.params.id,
      userId: user.id
    }
  }).then((file) => {
    if (file) {
      return Promise.all([
        new Promise((resolve) => {
          file.update(req.body).then(() => resolve())
        })
      ]).then(() => {
        res.json({
          status: 'OK'
        })
      })
    }
  })
})

exports.router = router
