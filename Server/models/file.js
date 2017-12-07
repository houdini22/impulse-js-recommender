const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()
const fs = require('fs')

const makePath = (id) => {
  return `${__dirname}/../../data/files/${id}`
}

const File = sequelize.define('file', {
  name: Sequelize.STRING,
  format: Sequelize.STRING,
  hasHeaderRow: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  indexId: Sequelize.INTEGER,
  filePath: {
    type: Sequelize.VIRTUAL,
    get () {
      return makePath(this.id)
    },
  },
  fileSize: Sequelize.STRING,
  linesCount: Sequelize.INTEGER,
  columnsCount: Sequelize.INTEGER,
}, {
  paranoid: true
})

exports.model = File
exports.sequelize = sequelize
