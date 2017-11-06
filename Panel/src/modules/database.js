import LocalStorageDB from 'localstoragedb'

const database = new LocalStorageDB('library', localStorage)

if (database.isNew()) {
  // database.createTable('rectangles', ['borderRadius', 'backgroundColor', 'size'])
  // database.commit()
}

export default database
