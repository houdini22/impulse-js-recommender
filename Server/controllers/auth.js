const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

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
      res.json({
        data: {
          username: user.username
        }
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
