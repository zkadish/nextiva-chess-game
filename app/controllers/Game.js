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
    const time = Helpers.getUnixTimeNow();

    const history = await db.query(GET_ALL_HISTORY, [game_id]);

    if (history.err) {
      return {
        err: history.err.message,
        status: 400,
      };
    }

    let { total = 0, start_time = 0 } = history.rows.length !== 0 && history.rows[0];

    if (history.rows.length === 0) {
      const game = await db.query(GET_GAME_BY_ID, [game_id]);

      if (game.err) {
        return {
          err: history.err.message,
          status: 400,
        };
      }

      start_time = game.rows[0].time;
    }

    const curTime = time - start_time - total;
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
        time: curTime,
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
  static async giveUp({ id, user_id, token }) {
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