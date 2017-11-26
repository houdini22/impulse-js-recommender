const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// config
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-SESSION-TOKEN')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(fileUpload())

const port = 3001 // TODO: config

// routes
const SnapshotsController = require('./controllers/snapshots')
app.use('/api/v1/snapshots', SnapshotsController.router)

const DatabasesController = require('./controllers/databases')
app.use('/api/v1/databases', DatabasesController.router)

const AuthController = require('./controllers/auth')
app.use('/api/v1/auth', AuthController.router)

const FilesController = require('./controllers/files')
app.use('/api/v1/files', FilesController.router)

const QueueController = require('./controllers/queue')
app.use('/api/v1/queue', QueueController.router)

const server = {
  instance: null
}

const socket = require('./modules/socket')

const start = () => {
  server.instance = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
  })
  socket.startServer()
}

exports.start = start
