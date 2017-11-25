exports.config = {
  database: {
    host: 'localhost',
    user: 'jsrs',
    password: 'jsrs',
    database: 'jsrs',
  },
  model: {
    ratedItem: {
      tableName: 'movies',
      primaryKey: 'id'
    },
    rating: {
      tableName: 'ratings',
      valueColumn: 'rating',
      ratedItemColumn: 'movie_id',
      rateByColumn: 'userId'
    },
    ratedBy: {
      tableName: 'users',
      primaryKey: 'id'
    }
  }
}
