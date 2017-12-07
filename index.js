const {MongoClient} = require('mongodb');

const state = {
  db: null
};

exports.connect = (url) => {
  if (state.db) {
    return Promise.resolve(state.db);
  }
  return MongoClient.connect(url)
  .then((db) => {
      state.db = db;
      return Promise.resolve(state.db);
    });
};

exports.get = () => state.db;
