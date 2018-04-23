const db = require('../db');
const User = require('./User');
const Helpers = require('../utils/helpers');

const {
  GET_GAME_BY_ID,
  GET_ALL_HISTORY,
  INSERT_STATE_CHESS,
  UPDATE_GIVE_UP,
} = require('../db/game');


/**
 * Manipulate game of state
 * */
class Game {

  /**
   * Move figure for game
   * @param {string} token: token for authorization
   * @param {number} game_id: id game
   * @param {string} state: state Game (FEN)
   * @param {boolean} is_over: game is over or not
   * @return {object} status, err|data
   * */
  static async moveFigure({ token, game_id, state, is_over = false }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    if (state === undefined || !game_id) {
      return {
        err: `State or game_id are undefined`,
        status: 400,
      }
    }

    const { id, username } = per;

    const history = await db.query(GET_ALL_HISTORY, [game_id, id]);

    if (history.err) {
      return {
        err: history.err.message,
        status: 400,
      };
    }

    let total = history.rows.length !== 0 ? history.rows[0].total : 0;

    const game = await db.query(GET_GAME_BY_ID, [game_id]);

    if (game.err) {
      return {
        err: history.err.message,
        status: 400,
      };
    }

    const curGame = game.rows[0];
    const start_time = curGame.time;
    const secondPlayerId = curGame.first_player_id === id ? curGame.second_player_id : curGame.first_player_id;

    const historySecond = await db.query(GET_ALL_HISTORY, [game_id, secondPlayerId]);

    if (historySecond.err) {
      return {
        err: historySecond.err.message,
        status: 400,
      };
    }

    const secondTotal = historySecond.rows.length !== 0 ? historySecond.rows[0].total : 0;

    const time = Helpers.getUnixTimeNow();
    const curTime = time - start_time - total - secondTotal;
    const { err } = await db.query(INSERT_STATE_CHESS, [game_id, id, state, curTime, is_over]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: {
        is_over,
        username,
        time: secondTotal,
      },
      status: 201,
    }
  }


  /**
   *  Give up game
   *  @param {string} token: token for authorization
   *  @param {number} id: id game
   *  @param {number} user_id: id user
   * */
  static async giveUp({ id, user_id = 0 }, token = '') {
    let per;

    if (token) {
      per = await User.permissionsToken(token);
      if (per.status) return per;
    }

    const { err } = await db.query(UPDATE_GIVE_UP, [id, token ? per.id : user_id]);

    if (err) {
      console.log(err.message, id);
      return {
        err: err.message,
        status: 400,
      }
    }

    return {
      username: per ? per.username : null,
      status: 201,
    }
  }
}


module.exports = Game;