const db = require('../db');
const User = require('./User');
const Helpers = require('../utils/helpers');


const GET_ALL_LIST = `SELECT * FROM games`;
const CREATE_GAME = `INSERT INTO games (first_player_id, initial_state) VALUES ($1, $2) RETURNING id`;
const GET_GAME_BY_ID = `SELECT * FROM games WHERE $1 = id`;
const GET_GAME_BY_ID_PLAYER = `SELECT * FROM games WHERE $1 = first_player_id`;
const CONNECT_TO_GAME = `INSERT INTO games (second_player_id, time) VALUES ($1, $2)`;
const GET_LAST_STATE_BY_ID_GAME = `
SELECT
  player_id,
  state, 
  time
FROM history 
WHERE time = (
  SELECT 
    max(time) 
    FROM history
    WHERE game_id = $1
  )
`;


class Rooms {
  static async getAllList() {
    let { rows, err } = await db.query(GET_ALL_LIST, []);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: rows,
      status: 200,
    };
  }


  static async createGame({ token, state }) {
    let per = await User.permissionsToken(token);
    if (per.status) return;

    const game = Rooms._getGame(GET_GAME_BY_ID_PLAYER, per.id);
    if (game.err) return game;

    if (game) {
      return {
        err: 'You created a game.',
        status: 409,
      };
    }

    let { rows, err } = await db.query(CREATE_GAME, [per.id, state]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: {
        room: Helpers.getRoomStr(rows[0].id),
      },
      status: 201,
    }
  }


  static async connectToGame({ token, game_id }) {
    let per = await User.permissionsToken(token);
    if (per.status) return;

    const game = Rooms._getGame(GET_GAME_BY_ID, game_id);
    if (game.err) return game;

    if (!game || game.second_player_id) {
      return {
        err: !game ? `The game doesn't exist.` : 'Game is busy.',
        status: 409,
      };
    }

    let { err } = await db.query(CONNECT_TO_GAME, [per.id, Helpers.getUnixTimeNow()]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: {
        // first_player:,
        // second_player:,
        room: Helpers.getRoomStr(game_id),
      },
      status: 201,
    }
  }


  static async connectToGameVisitor({ token, game_id }) {
    let per = await User.permissionsToken(token);
    if (per.status) return;

    const game = Rooms._getGame(GET_GAME_BY_ID, game_id);
    if (game.err) return game;

    if (!game) {
      return {
        err: `The game doesn't exist.`,
        status: 409,
      };
    }

    const { rows, err } = db.query(GET_LAST_STATE_BY_ID_GAME, [game_id]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: {
        data: rows[0],
        room: Helpers.getRoomStr(game_id),
      },
      status: 200,
    };
  }


  static async _getGame(request, id) {
    const { rows, err } = await db.query(request, [id]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return rows.length !== 0 ? rows[0] : null;
  }
}


module.exports = Rooms;