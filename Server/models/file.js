const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const File = sequelize.define('file', {
  name: Sequelize.STRING,
  fileName: Sequelize.STRING,
  format: Sequelize.STRING,
  token: Sequelize.STRING,
  hasHeaderRow: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  indexId: Sequelize.INTEGER,
  filePath: {
    type: Sequelize.VIRTUAL,
    get () {
      const fileName = this.getDataValue('fileName')
      return `${__dirname}/../../data/files/${this.id}_${fileName}`
    },
  },
}, {
  paranoid: true
})

exports.model = File
exports.sequelize = sequelize
