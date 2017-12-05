const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()
const fs = require('fs')

const Snapshot = sequelize.define('snapshot', {
  name: Sequelize.STRING,
  itemsTableName: Sequelize.STRING,
  itemsFieldPk: Sequelize.STRING,
  ratedByTableName: Sequelize.STRING,
  ratedByFieldPk: Sequelize.STRING,
  ratingsTableName: Sequelize.STRING,
  ratingsFieldItemId: Sequelize.STRING,
  ratingsFieldCategoryId: Sequelize.STRING,
  ratingsFieldValue: Sequelize.STRING,
  itemsColumn: Sequelize.INTEGER,
  ratedByColumn: Sequelize.INTEGER,
  ratingColumn: Sequelize.INTEGER,
  status: Sequelize.ENUM('CREATED', 'ADDED_TO_QUEUE', 'PARSED', 'RUNNING'),
  isBuilt: Sequelize.BOOLEAN,
  databaseId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  fileId: Sequelize.INTEGER,
  indexDataPath: {
    type: Sequelize.VIRTUAL,
    get () {
      return `${__dirname}/../../data/snapshots/${this.id}/`
    },
  },
  subjectsCount: {
    type: Sequelize.VIRTUAL,
    get () {
      const path = `${__dirname}/../../data/snapshots/${this.id}/statistics.json`
      if (fs.existsSync(path)) {
        const content = JSON.parse(fs.readFileSync(path, 'UTF-8'))
        return content.subjectsCount
      }
    },
  },
  usersCount: {
    type: Sequelize.VIRTUAL,
    get () {
      const path = `${__dirname}/../../data/snapshots/${this.id}/statistics.json`
      if (fs.existsSync(path)) {
        const content = JSON.parse(fs.readFileSync(path, 'UTF-8'))
        return content.usersCount
      }
    },
  },
  ratingsCount: {
    type: Sequelize.VIRTUAL,
    get () {
      const path = `${__dirname}/../../data/snapshots/${this.id}/statistics.json`
      if (fs.existsSync(path)) {
        const content = JSON.parse(fs.readFileSync(path, 'UTF-8'))
        return content.ratingsCount
      }
    },
  },
  density: {
    type: Sequelize.VIRTUAL,
    get () {
      const path = `${__dirname}/../../data/snapshots/${this.id}/statistics.json`
      if (fs.existsSync(path)) {
        const content = JSON.parse(fs.readFileSync(path, 'UTF-8'))
        return content.density
      }
    },
  },
})

exports.model = Snapshot
exports.sequelize = sequelize
