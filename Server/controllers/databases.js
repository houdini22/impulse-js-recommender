const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment')

const db = require('../../Recommender/modules/database/proxy')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(bodyParser.text())

router.get('/', async (req, res) => {
  db.query('SELECT * FROM _jsrs_databases').then((data) => {
    res.json({
      data
    })
  })
})

router.post('/', async (req, res) => {
  const data = req.body
  data.date_added = moment().format('YYYY-MM-DD HH:mm:ss')
  db.insert('_jsrs_databases', data).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.delete('/:id', async (req, res) => {
  db.query('DELETE FROM _jsrs_databases WHERE id = ?', [req.params.id]).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

exports.router = router
