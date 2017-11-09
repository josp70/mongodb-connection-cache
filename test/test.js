const db = require('../index');
const assert = require('assert');

describe('mongodb-connection', _ => {
    it('should fail on empty url', () => {
	return db.connect('').then(db => {
	    db.close();
	    throw new Error('Promise was unexpectedly fulfilled ');
	}).catch(error => {
	    assert.equal(error.constructor.name, 'Error');
	    assert.equal(error.message,'invalid schema, expected mongodb')
	});
    });

    it('should fail on wrong port', () => {
	return db.connect('mongodb://localhost:27018/test').then(db => {
	    db.close();
	    throw new Error('Promise was unexpectedly fulfilled ');
	}).catch(error => {
	    assert.equal(error.constructor.name, 'Error');
	    assert.equal(error.name, 'MongoError');
	});
    });

    it('should connect to default localhost db', () => {
	return db.connect('mongodb://localhost:27017/test').then(db => {
	    return db.admin().ping().then(result=>{
		assert.equal(result.ok,1);
		return db;
	    }).then(db=>{db.close()});
	});	
    });    
});







