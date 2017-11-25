const Sequelize = require('sequelize')
const sequelize = require('../modules/database-new/connection').getSequelizeConnection()

const Snapshot = sequelize.define('_jsrs_snapshots', {
  name: Sequelize.STRING,
  items_table_name: Sequelize.STRING,
  items_field_pk: Sequelize.STRING,
  rated_by_table_name: Sequelize.STRING,
  rated_by_field_pk: Sequelize.STRING,
  ratings_table_name: Sequelize.STRING,
  ratings_field_item_id: Sequelize.STRING,
  ratings_field_category_id: Sequelize.STRING,
  ratings_field_value: Sequelize.STRING,
  items_column: Sequelize.INTEGER,
  rated_by_column: Sequelize.INTEGER,
  rating_column: Sequelize.INTEGER,
  status: Sequelize.STRING,
  is_built: Sequelize.BOOLEAN,
  is_trained: Sequelize.BOOLEAN,
  database_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  file_id: Sequelize.INTEGER,
})

exports.model = Snapshot
exports.sequelize = sequelize
