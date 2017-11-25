const UserModel = require('../models/user').model

const getUserFromRequest = async (req) => {
  const token = req.header('X-SESSION-TOKEN')
  const user = await UserModel.findOne({
    where: {
      token
    }
  })
  await user.update({
    lastAction: new Date()
  })
  return user
}

exports.getUserFromRequest = getUserFromRequest
