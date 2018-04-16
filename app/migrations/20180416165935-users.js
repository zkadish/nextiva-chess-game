'use strict';

var dbm;
var type;
var seed;

const defaultValues = [
  [
    'savtym@gmail.com',
    'savtym',
    'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InF3ZXJ0eSIsImlhdCI6MTUyMjI0MzQ3M30.ZBPrfoudpTC4gLyg2pM07rEDUfqT-KlWPK7-0E5bSus',
    '$2a$10$PpbCvwiMz2LwfWe1fXwfcevfGXCWjoXK01KbfAIvfF9lkTNIpQBt.',
    '$2a$10$PpbCvwiMz2LwfWe1fXwfce'
  ]
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
