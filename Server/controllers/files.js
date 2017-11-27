const express = require('express')
const router = express.Router()
const fs = require('fs')
const Papa = require('papaparse')
const md5 = require('md5')

const DB = require('../modules/database-new/connection')
const FileModel = require('../models/file').model
const { getUserFromRequest } = require('../helpers')

router.get('/', async (req, res) => {
  const user = await getUserFromRequest(req)

  FileModel.findAll({
    where: {
      userId: user.id
    }
  }).then((files) => {
    res.json({
      data: files
    })
  })
})

router.post('/', async (req, res) => {
  const user = await getUserFromRequest(req)
  const data = req.body

  data.userId = user.id
  FileModel.create(data).then(() => {
    res.json({
      status: 'OK'
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

router.put('/', async (req, res) => {
  const user = await getUserFromRequest(req)

  FileModel.findOne({
    where: {
      token: req.body.token,
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

router.get('/get_file_info', async (req, res) => {
  const user = await getUserFromRequest(req)
  FileModel.findOne({
    where: {
      token: req.query.token,
      userId: user.id
    }
  }).then((file) => {
    if (file) {
      const filePath = `./../data/files/${file.id}_${file.fileName}`
      const content = fs.readFileSync(filePath, 'utf-8')
      return Papa.parse(content, {
        complete: function (results) {
          res.json({
            status: 'OK',
            data: {
              firstRows: results.data.slice(file.get('hasHeaderRow') ? 1 : 0, file.get('hasHeaderRow') ? 11 : 10),
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
  const fileName = md5(file.name + Math.random() + (new Date()).getTime())
  const data = req.body
  const user = await getUserFromRequest(req)

  FileModel.create({
    name: file.name,
    fileName: fileName,
    userId: user.id,
    format: data.format,
    token: md5(fileName + Math.random() + (new Date()).getTime())
  }).then((createdFile) => {
    file.mv(`./../data/files/${createdFile.id}_${fileName}`)
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

exports.router = router
