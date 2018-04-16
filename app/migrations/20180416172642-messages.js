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
    game_id: {
      type: 'int',
      notNull: true,
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
    player_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'messages_player_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    step: {type: 'string', notNull: true},
    time: {type: 'string', notNull: true}
  }, () => {
    for (let w of defaultValues) {
      db.insert('messages', ['game_id', 'step', 'time'], w, callback);
    }
  });
};

exports.down = function(db) {
  return db.dropTable('messages');
};

exports._meta = {
  "version": 1
};
