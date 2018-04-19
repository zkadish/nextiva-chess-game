const db = require('../db');
const User = require('./User');
const Helpers = require('../utils/helpers');

const GET_ALL_HISTORY = `
SELECT
  COALESCE(sum(h.time), 0) AS total,
  g.time AS start_time
FROM history AS h
JOIN games AS g ON g.id = h.game_id
WHERE h.game_id = $1
GROUP BY start_time
`;
const INSERT_STATE_CHESS = `
INSERT INTO history 
  (game_id, player_id, state, time, give_up) 
VALUES ($1, $2, $3, $4, $5)
`;
const UPDATE_GIVE_UP = `UPDATE games SET is_give_up = true WHERE id = $1`;


class Game {

  static async moveFigure({ token, game_id, state, is_give_up = false }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    if (state === undefined) {
      return {
        err: `State is undefined`,
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

    const { total, start_time } = history.rows[0];
    const curTime = time - start_time - total;

    const { err } = await db.query(INSERT_STATE_CHESS, [game_id, id, state, curTime, is_give_up]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: { time: curTime, username, is_give_up },
      status: 201,
    }
  }


  static async giveUp(id) {
    const { err } = await db.query(UPDATE_GIVE_UP, [id]);

    if (err) {
      console.log(err.message, id);
    }
  }

}


module.exports = Game;