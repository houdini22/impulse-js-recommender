const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const UserModel = require('../models/user').model
const sequelize = require('../models/notification').sequelize
const NotificationModel = require('../models/notification').model
const getUserNotifications = require('../models/notification').getUserNotifications

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

const sendNotifications = () => {
  sequelize
    .query('SELECT _notifications.userId, ' +
      '(SELECT token from users WHERE users.id = _notifications.userId LIMIT 1) as token, ' +
      'IF((SELECT COUNT(*) as count FROM notifications WHERE notifications.userId = _notifications.userId AND notifications.isSent = 0 LIMIT 1) > 0, 1, 0) as ifSend ' +
      'from notifications as _notifications WHERE isRead = 0 GROUP BY userId')
    .then(userIds => {
      const promises = []
      userIds.forEach(row => {
        if (row[0].ifSend) {
          promises.push(new Promise((resolve) => {
            getUserNotifications({
              id: row[0].userId
            }).then((notifications) => {
              emitToClient(row[0].token, 'notifications', notifications)
              resolve(row[0].userId)
            })
          }))
        }
      })
      if (promises.length > 0) {
        Promise.all(promises).then((ids) => {
          ids.forEach((id) => {
            NotificationModel.update({
              isSent: 1
            }, {
              where: {
                userId: id
              }
            })
          })
        })
      }
    })
}

const startServer = () => {
  http.listen(5000, () => {
    console.log('listening on *:5000')

    setInterval(sendNotifications, 5000)
  })
}

const emitToClient = (token, message, data) => {
  if (clients[token]) {
    console.log('SENDING TO CLIENT', message, data)
    io.to(clients[token]).emit(message, data)
  }
}

exports.startServer = startServer
exports.emitToClient = emitToClient
