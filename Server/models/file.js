const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const File = sequelize.define('file', {
  name: Sequelize.STRING,
  format: Sequelize.STRING,
  hasHeaderRow: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  indexId: Sequelize.INTEGER,
  filePath: {
    type: Sequelize.VIRTUAL,
    get () {
      return `${__dirname}/../../data/files/${this.id}`
    },
  },
}, {
  paranoid: true
})

exports.model = File
exports.sequelize = sequelize
