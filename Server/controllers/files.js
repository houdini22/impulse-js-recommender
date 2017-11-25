const express = require('express')
const router = express.Router()
const fs = require('fs')
const Papa = require('papaparse')
const md5 = require('md5')

const DB = require('../modules/database-new/connection')
const FileModel = require('../models/file').model

router.get('/', async (req, res) => {
  FileModel.findAll().then((files) => {
    res.json({
      data: files
    })
  })
})

router.post('/', async (req, res) => {
  const data = req.body

  FileModel.create(data).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.put('/', async (req, res) => {
  const data = req.body

  FileModel.update(data, {
    where: {
      token: data.token
    }
  }).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.delete('/:id', async (req, res) => {
  FileModel.findById(req.params.id).then((file) => {
    if (file) {
      Promise.all([
        new Promise((resolve) => {
          file.destroy().then(() => resolve())
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
  FileModel.findOne({
    where: {
      token: req.query.token
    }
  }).then((file) => {
    if (file) {
      const filePath = `./../data/files/${file.id}_${file.fileName}`
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
    }
  })
})

router.post('/upload', async (req, res) => {
  const file = req.files.file
  const fileName = md5(file.name + Math.random() + (new Date()).getTime())
  const data = req.body

  FileModel.create({
    name: file.name,
    fileName: fileName,
    user_id: 1,
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
