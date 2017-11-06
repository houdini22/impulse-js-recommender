const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment')

const db = require('../../Recommender/modules/database/proxy')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(bodyParser.text())

router.get('/get_tables', async (req, res) => {
  db.query('SHOW TABLES').then((result) => {
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

router.get('/get_rating_fields', async (req, res) => {
  db.query(`SHOW COLUMNS FROM ${req.query.table_name}`).then((result) => {
    const fields = []
    result.forEach((row) => {
      fields.push(row.Field)
    })
    res.json({
      data: fields
    })
  })
})

router.post('/create_snapshot', async (req, res) => {
  const data = req.body
  data.date_added = moment().format('YYYY-MM-DD HH:mm:ss')
  data.items_field_pk = (await db.query(`SHOW KEYS FROM ${data.items_table_name} WHERE Key_name = 'PRIMARY'`))[0].Column_name
  data.rated_by_field_pk = (await db.query(`SHOW KEYS FROM ${data.rated_by_table_name} WHERE Key_name = 'PRIMARY'`))[0].Column_name
  db.insert('_jsrs_indexes', data).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.get('/get_indexes', async (req, res) => {
  db.query('SELECT * FROM _jsrs_indexes').then((data) => {
    res.json({
      data
    })
  })
})

router.post('/build_index', async (req, res) => {
  const data = req.body
  db.query('UPDATE _jsrs_indexes SET is_built = 1 WHERE id = ?', [data.index_id]).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

router.delete('/delete/:id', async (req, res) => {
  db.query('DELETE FROM _jsrs_indexes WHERE id = ?', [req.params.id]).then(() => {
    res.json({
      status: 'OK'
    })
  })
})

exports.router = router
