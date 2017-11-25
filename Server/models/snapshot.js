const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Snapshot = sequelize.define('_jsrs_snapshots', {
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
  status: Sequelize.STRING,
  isBuilt: Sequelize.BOOLEAN,
  isTrained: Sequelize.BOOLEAN,
  databaseId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  fileId: Sequelize.INTEGER,
})

exports.model = Snapshot
exports.sequelize = sequelize
