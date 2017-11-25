const db = require('../database/proxy')

const buildDatabase = async (config = { numOfFeatures: 2 }) => {
  const ratings = await db.query('SELECT * FROM ratings')
  const ratedItems = await db.query('SELECT id FROM movies ORDER BY id ASC')
  const ratedByItems = await db.query('SELECT id FROM users ORDER BY id ASC')

  const numOfFeatures = config.numOfFeatures

  let i = 0
  let x = []
  let y = []
  let theta = []
  let means = []

  ratedItems.forEach((ratedItem) => {
    let j = 0
    let count = 0
    means[i] = 0

    ratedByItems.forEach((ratedByItem) => {
      let rating = ratings.filter((rating) => {
        if (rating.movie_id === ratedItem.id &&
          rating.userId === ratedByItem.id) {
          return true
        }
        return false
      })

      if (rating.length) {
        rating = rating[0].rating
      } else {
        rating = null
      }

      y.push({
        row: j,
        col: i,
        value: rating,
        item_id: ratedItem.id,
        rated_by_id: ratedByItem.id
      })

      if (rating !== null) {
        means[i] += Number(rating)
        count++
      }

      j++
    })

    for (let k = 0; k < numOfFeatures; k++) {
      x.push({
        row: i,
        col: k,
        value: Math.random()
      })
    }

    means[i] /= count

    i++
  })

  for (let i = 0; i < ratedByItems.length; i++) {
    for (let k = 0; k < numOfFeatures; k++) {
      theta.push({
        row: i,
        col: k,
        value: Math.random()
      })
    }
  }

  for (let i = 0; i < x.length; i++) {
    await db.insert('_jsrs_x', x[i])
  }

  for (let i = 0; i < y.length; i++) {
    if (y[i].value !== null) {
      y[i].value = Number(y[i].value) - means[y[i].col]
    }
    await db.insert('_jsrs_y', y[i])
  }

  for (let i = 0; i < theta.length; i++) {
    await db.insert('_jsrs_theta', theta[i])
  }

  for (let i = 0; i < means.length; i++) {
    await db.insert('_jsrs_means', {
      row: i,
      value: means[i]
    })
  }
}

const clearDatabase = async () => {
  await db.query('TRUNCATE _jsrs_x')
  await db.query('TRUNCATE _jsrs_y')
  await db.query('TRUNCATE _jsrs_theta')
  await db.query('TRUNCATE _jsrs_means')
  await db.query('TRUNCATE _jsrs_predictions')
}

const predict = async (itemId, ratedById) => {
  const result = await db.query('SELECT * FROM _jsrs_y WHERE item_id = ? AND rated_by_id = ? LIMIT 1', [itemId, ratedById])
  const mean = await db.query('SELECT * FROM _jsrs_means WHERE row = ? LIMIT 1', [result[0].row])

  if (result.length) {
    return result[0].value + mean[0].value
  }

  return mean[0].value
}

const calculatePredictions = async () => {
  await db.query('TRUNCATE _jsrs_predictions')
  // get items
  const ratedItems = await db.query('SELECT id FROM movies ORDER BY id ASC')
  // get categories
  const ratedByItems = await db.query('SELECT id FROM users ORDER BY id ASC')
  // result
  const predictions = []

  for (let i = 0; i < ratedItems.length; i++) {
    for (let j = 0; j < ratedByItems.length; j++) {
      if (!predictions[j]) {
        predictions[j] = []
      }
      predictions[j][i] = {
        value: 0,
        item_id: ratedItems[i].id,
        rated_by_id: ratedByItems[j].id
      }

      const vecX = await db.query('SELECT * FROM _jsrs_x WHERE row = ?', [i])
      const vecTheta = await db.query('SELECT * FROM _jsrs_theta WHERE row = ?', [j])

      for (let k = 0; k < vecX.length; k++) {
        predictions[j][i].value += vecX[k].value * vecTheta[k].value
      }
    }
  }

  for (let i = 0; i < predictions.length; i++) {
    for (let j = 0; j < predictions[i].length; j++) {
      await db.insert('_jsrs_predictions', {
        row: i,
        col: j,
        ...predictions[i][j]
      })
    }
  }
}

exports.buildDatabase = buildDatabase
exports.clearDatabase = clearDatabase
exports.predict = predict
exports.calculatePredictions = calculatePredictions
