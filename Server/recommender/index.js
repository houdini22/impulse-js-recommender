const dbConnection = require('../modules/database/connection')
const dbProxy = require('../modules/database/proxy')
const recommender = require('../modules/recommender/index')

dbConnection.connect().then(() => {
  console.log('connected')
  /*recommender.clearDatabase();
  recommender.buildDatabase({
    numOfFeatures: 2
  });*/
  /*recommender.predict(1, 1).then((result) => {
    console.log(result);
  });
  recommender.predict(2, 2).then((result) => {
    console.log(result);
  });*/
  recommender.calculatePredictions()
})
