const db = require('../db');
const User = require('./User');
const Helpers = require('../utils/helpers');


const GET_ALL_LIST = `
SELECT 
	g.id,
	uf.username AS first_player,
	(
    SELECT 
      username 
    FROM users 
    WHERE id = g.second_player_id
  ) AS second_player
FROM games AS g
JOIN users AS uf ON uf.id = g.first_player_id
WHERE is_give_up = false
`;
const CREATE_GAME = `INSERT INTO games (first_player_id, initial_state, time) VALUES ($1, $2, $3) RETURNING id`;
const GET_GAME_BY_PLAYER_ID = `SELECT * FROM games WHERE first_player_id = $1`;
const GET_GAME_BY_ID = `
SELECT 
	g.id,
	g.initial_state,
	g.time,
	uf.username AS first_player,
	(
    SELECT 
      username 
    FROM users
    WHERE id = g.second_player_id
  ) AS second_player
FROM games AS g
JOIN users AS uf ON uf.id = g.first_player_id
WHERE g.id = $1
`;
const GET_GAME_BY_ID_PLAYER = `SELECT * FROM games WHERE $1 = first_player_id`;
const CONNECT_TO_GAME = `UPDATE games SET second_player_id = $1, time = $2 WHERE id = $3`;
const GET_LAST_STATE_BY_ID_GAME = `
SELECT
  u.username,
  h.state, 
  h.time
FROM history AS h
JOIN users AS u ON u.id = h.player_id
WHERE time = (
  SELECT 
    max(time) 
    FROM history
    WHERE game_id = $1
  )
`;


class Rooms {
  /**
   * Get all list rooms
   * */
  static async getAllList() {
    let { rows, err } = await db.query(GET_ALL_LIST, []);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    console.log(rows)

    return {
      data: rows,
      status: 200,
    };
  }


  /**
   * Crate game
   * @param {string} token: token for authorization
   * @param {string} state:
   * */
  static async createGame({ token, state }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    const game = await Rooms._getGame(GET_GAME_BY_ID_PLAYER, per.id);

    if (game && game.err) {
      return {
        err: game.err.message,
        status: 400,
      };
    }

    if (game) {
      return {
        err: 'You created a game.',
        status: 409,
      };
    }

    const date = Helpers.getUnixTimeNow();
    let { rows, err } = await db.query(CREATE_GAME, [per.id, state, date]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    const { id } = rows[0];

    return {
      date,
      time: 0,
      data: { id },
      room: Helpers.getRoomStr(id),
      status: 201,
    }
  }


  static async connectToGame({ token, game_id }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    const game = await Rooms._getGame(GET_GAME_BY_ID, game_id);
    if (game && game.err) return game;


    if (!game || game.second_player) {
      return {
        err: !game ? `The game doesn't exist.` : 'Game is busy.',
        status: 409,
      };
    }


    if (game.first_player === per.id) {
      return {
        err: `You can't play with themselves.`,
        status: 409,
      };
    }

    const gameOfPlayer = await db.query(GET_GAME_BY_PLAYER_ID, [per.id]);

    if (gameOfPlayer.err) {
      return {
        err: gameOfPlayer.err.message,
        status: 400,
      };
    }

    if (gameOfPlayer.rows.length !== 0) {
      return {
        err: `You have a game.`,
        status: 409,
      };
    }

    const date = Helpers.getUnixTimeNow();

    let { err } = await db.query(CONNECT_TO_GAME, [per.id, date, game_id]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: {
        date,
        time: 0,
        state: game.initial_state,
        first_player: game.first_player,
        second_player: per.username,
      },
      room: Helpers.getRoomStr(game_id),
      status: 201,
    }
  }


  static async connectToGameVisitor({ token, game_id }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    const game = await Rooms._getGame(GET_GAME_BY_ID, game_id);
    if (game && game.err) return game;

    if (!game) {
      return {
        err: `The game doesn't exist.`,
        status: 409,
      };
    }


    let { rows, err } = await db.query(GET_LAST_STATE_BY_ID_GAME, [game_id]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }


    let data = rows[0];

    if (rows.length === 0) {
      data = game;
      data.time = 0;
      data.state = data.initial_state;
    }

    return {
      data: {
        time: data.time,
        state: data.state,
        first_player: game.first_player,
        second_player: game.second_player,
      },
      room: Helpers.getRoomStr(game_id),
      status: 201,
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