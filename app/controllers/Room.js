const db = require('../db');
const User = require('./User');


const GET_ALL_LIST = `SELECT first_player_id, second_player_id `;


class Room {
  static async getAllList({ token, game_id }) {
    let per = await User.permissions(req, res);
    if (!per) return;

    let { rows, err } = await db.query(GET_ALL_LIST, [per.id]);


  }
}


module.exports = Room;