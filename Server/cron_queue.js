// config
const queueRunningLength = 2
const intervalTime = 20000

// program
const QueueModel = require('./models/queue').model
const SnapshotModel = require('./models/snapshot').model
const FileModel = require('./models/file').model
const command = require('./modules/command')

const run = () => {
  QueueModel.count({
    where: {
      status: 'RUNNING'
    }
  }).then((count) => {
    if (count < queueRunningLength) {
      QueueModel.findAll({
        where: {
          status: 'CREATED'
        },
        include: [{
          model: SnapshotModel,
        }, {
          model: FileModel
        }],
        order: [['id', 'ASC']],
        limit: queueRunningLength - count
      }).then((queues) => {
        if (queues) {
          queues.forEach((queue) => {
            if (queue.get('snapshot')) {
              const snapshot = queue.get('snapshot')
              const file = queue.get('file')
              Promise.all([
                new Promise((resolve) => {
                  queue.update({
                    status: 'RUNNING'
                  }).then(() => resolve())
                }),
                new Promise((resolve) => {
                  snapshot.update({
                    status: 'RUNNING'
                  }).then(() => resolve())
                })
              ]).then(() => {
                command.runBuildIndex([
                  file.get('filePath'),
                  file.get('hasHeaderRow') ? 1 : 0,
                  snapshot.get('itemsColumn'),
                  snapshot.get('ratedByColumn'),
                  snapshot.get('ratingColumn'),
                  snapshot.get('indexDataPath')
                ], () => {
                  queue.update({
                    status: 'ENDED'
                  })
                  snapshot.update({
                    status: 'PARSED'
                  })
                })
              })
            }
          })
        }
      })
    }
  })
}

run()
setInterval(() => run(), intervalTime)
