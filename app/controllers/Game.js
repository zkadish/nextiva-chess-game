const db = require('../db');
const User = require('./User');
const Helpers = require('../utils/helpers');


const INSERT_STATE_CHESS = `
INSERT INTO history 
  (game_id, player_id, state, time, give_up) 
VALUES ($1, $2, $3, $4, $5)
`;


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

    const { err } = db.query(INSERT_STATE_CHESS, [game_id, id, state, time, is_give_up]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: { time, username, is_give_up },
      status: 201,
    }
  }

}


module.exports = Game;