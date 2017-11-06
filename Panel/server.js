const fs = require('fs')
const https = require('https')
const options = {
  key: fs.readFileSync('./ServerApp/cert.pem'),
  cert: fs.readFileSync('./ServerApp/cert.crt')
}
const server = https.createServer(options)
const socketIO = require('socket.io')
const io = socketIO()
const moment = require('moment')

const sessionDb = require('./ServerApp/modules/database/sessions')
const usersDb = require('./ServerApp/modules/database/users')

const config = require('./ServerApp/config')

io.on('connection', (socket) => {
  // DISCONNECT
  socket.on('disconnect', () => {
    // remove session
    sessionDb.getSessionById(socket.id).then((user) => {
      io.to('main').emit('user left', {
        user: {
          username: user.username
        },
        timestamp: new Date()
      })
    })

    sessionDb.removeSession(socket.id)
  })

  // LOGIN
  socket.on('login', (loginData) => {
    usersDb.loginAttempt(loginData.username, loginData.password)
      .then((user) => {                                               // ok - logged in
        sessionDb.userLoggedIn(socket.id, user.id)
        socket.emit('logged in', {
          username: loginData.username,
          token: socket.id
        })

        let timeout = null
        const emitStop = (data) => {
          io.to('main').emit('user stops writing', {
            user: {
              username: data.user.username,
            }
          })
        }

        socket.on('user starts writing', (data) => {
          io.to('main').emit('user starts writing', {
            user: {
              username: data.user.username,
            }
          })
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            emitStop(data)
          }, 2000)
        })

        socket.on('user stops writing', (data) => {
          clearTimeout(timeout)
          emitStop(data)
        })

        socket.on('get users', () => {
          sessionDb.getLoggedInUsers().then((users) => {
            socket.emit('users get', users)
          })
        })

        socket.on('send message', (data) => {
          let { message, user } = data
          io.to('main').emit('message sent', {
            message,
            timestamp: moment(),
            user: {
              username: user.username
            }
          })
        })

        socket.join('main', () => {
          io.to('main').emit('user joined', {
            user: {
              username: loginData.username
            },
            timestamp: new Date()
          })
        })
      })
      .catch(() => {                                                  // wrong credentials
        socket.emit('login failed')
      })
  })

  // save session
  sessionDb.createSession({
    id: socket.id,
    client_ip: socket.request.connection.remoteAddress
  })
})

server.listen(config.server.port)
io.attach(server)
console.log(`Up and running on port ${config.server.port}`)
