const fs = require('fs')

const factory = (id) => {
  const path = `${__dirname}/../../data/snapshots/statuses/${id}.json`
  const data = JSON.parse(fs.existsSync(path) ? fs.readFileSync(path, 'utf-8') : '{}')

  const save = () => {
    fs.writeFileSync(path, JSON.stringify(data))
  }

  const remove = () => {
    fs.unlinkSync(path)
  }

  const set = (key, value) => {
    data[key] = value
    save()
  }

  return {
    set,
    remove,
  }
}

exports.factory = factory
exports.status = {
  ADDED_TO_QUEUE: 'ADDED_TO_QUEUE',
  CREATED: 'CREATED'
}
