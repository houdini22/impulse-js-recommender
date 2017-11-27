const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const UserModel = require('../models/user').model

const clients = {}

io.on('connection', async (socket) => {
  socket.on('disconnected', async () => {
    delete clients[socket.handshake.query.token]
  })

  UserModel.findOne({
    where: {
      token: socket.handshake.query.token
    }
  }).then((user) => {
    if (user) {
      console.log('client connected')
      clients[socket.handshake.query.token] = socket.id
    } else {
      socket.disconnect()
    }
  })
})

const startServer = () => {
  http.listen(5000, () => {
    console.log('listening on *:5000')
  })
}

const emitToClient = (token, message, data) => {
  if (clients[token]) {
    io.to(clients[token]).emit(message, data)
  }
}

exports.startServer = startServer
exports.emitToClient = emitToClient
