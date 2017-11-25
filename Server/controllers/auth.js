const express = require('express')
const router = express.Router()
const md5 = require('md5')

const UserModel = require('../models/user').model

router.post('/login', async (req, res) => {
  const data = req.body
  UserModel.findOne({
    where: {
      username: data.username,
      password: UserModel.sequelize.where(UserModel.sequelize.fn('MD5', data.password), UserModel.sequelize.col('password'))
    }
  }).then((user) => {
    if (user) {
      user.update({
        token: md5((new Date()).getTime() + user.id)
      }).then(() => {
        res.json({
          data: {
            username: user.username,
            token: user.token
          }
        })
      })
    } else {
      res.status(401)
      res.json({
        status: 'ERR'
      })
    }
  })
})

exports.router = router
