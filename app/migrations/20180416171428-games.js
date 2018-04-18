'use strict';

var dbm;
var type;
var seed;

const Helpers = require('../utils/helpers');

const defaultValues = [
  [1, 2, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', Helpers.getUnixTimeNow()],
];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  return db.createTable('games', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    first_player_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'games_first_player_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    second_player_id: {
      type: 'int',
      foreignKey: {
        name: 'games_second_player_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    initial_state: { type: 'string', notNull: true },
    time: { type: 'string', notNull: true }
  }, () => {
    const columns = ['first_player_id', 'second_player_id', 'initial_state', 'time'];
    for (let game of defaultValues) {
      db.insert('games', columns.slice(0, game.length), game, callback);
    }
  });
};

exports.down = function (db) {
  return db.dropTable('games');
};

exports._meta = {
  "version": 1
};
