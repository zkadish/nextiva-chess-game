'use strict';

var dbm;
var type;
var seed;

const defaultValues = [
];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.createTable('users', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    email: {type: 'string', notNull: true, unique: true},
    username: {type: 'string', notNull: true},
    token: {type: 'string', notNull: true},
    hash: {type: 'string', notNull: true},
    salt: {type: 'string', notNull: true}
  }, () => {
    for (let w of defaultValues) {
      db.insert('users', ['email', 'username', 'token', 'hash', 'salt'], w, callback);
    }
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
