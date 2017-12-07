/* eslint no-process-env: "off" */
/* global describe, it */

const dbcache = require('../index');
const assert = require('assert');

describe('mongodb-connection', () => {
  const host = process.env.MONGO_HOST || 'localhost';
  const urlDB = `mongodb://${host}:27017/test`;
  const urlDBWrongPort = `mongodb://${host}:27018/test`;

  it('should fail on empty url',
  () => dbcache.connect('').then((db) => {
    db.close();
    throw new Error('Promise was unexpectedly fulfilled ');
  })
  .catch((error) => {
    assert.equal(error.constructor.name, 'Error');
    assert.equal(error.message, 'invalid schema, expected mongodb');
  }));

  it('should fail on wrong port',
  () => dbcache.connect(urlDBWrongPort).then((db) => {
    db.close();
    throw new Error('Promise was unexpectedly fulfilled ');
  })
  .catch((error) => {
    assert.equal(error.constructor.name, 'Error');
    assert.equal(error.name, 'MongoError');
  }));

  it('should connect to default localhost db',
  () => dbcache.connect(urlDB)
  .then((db) => db.admin().ping())
  .then((result) => {
    assert.equal(result.ok, 1);
    return dbcache.get().close();
  }));
});
