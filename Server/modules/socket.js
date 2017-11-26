const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const clients = {}

io.on('connection', async (socket) => {
  console.log('client connected')
  clients[socket.handshake.query.token] = socket.id
})

const startServer = () => {
  http.listen(5000, () => {
    console.log('listening on *:5000')
  })
}

const emitToClient = (token, message) => {
  io.to(clients[token]).emit(message)
}

exports.startServer = startServer
exports.emitToClient = emitToClient
