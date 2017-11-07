const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

// config
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

const port = 3001 // TODO: config

// routes
const SnapshotsController = require('./controllers/snapshots')
app.use('/api/v1/snapshots', SnapshotsController.router)

const DatabasesController = require('./controllers/databases')
app.use('/api/v1/databases', DatabasesController.router)

const AuthController = require('./controllers/auth')
app.use('/api/v1/auth', AuthController.router)

const server = {
  instance: null
}

const start = () => {
  server.instance = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
  })
}

exports.start = start
