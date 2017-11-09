const {MongoClient} = require('mongodb');

let state = {
  db: null,
};

exports.connect = function(url) {
    if(state.db) {
	Promise.resolve(state.db);
    } else {
	return MongoClient.connect(url).then(db=>{
	    state.db = db;
	    return Promise.resolve(state.db);
	});
    }
};

exports.get = function() {
    return state.db;
};
