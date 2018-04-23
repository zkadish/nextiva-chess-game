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
  return db.createTable('messages', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'messages_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    message: {type: 'string', notNull: true},
    time: {type: 'int', notNull: true},
    game_id: {
      type: 'int',
      foreignKey: {
        name: 'messages_game_id_fk',
        table: 'games',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  }, () => {
    const columns = ['user_id', 'message', 'time', 'game_id'];
    for (let m of defaultValues) {
      db.insert('messages', columns.slice(0, m.length), m, callback);
    }
  });
};

exports.down = function(db) {
  return db.dropTable('messages');
};

exports._meta = {
  "version": 1
};
