const db = require('../db');
const User = require('./User');
const Helpers = require('../utils/helpers');

const {
  GET_MESSAGES,
  INSERT_MESSAGE,
} = require('../db/chats');


/**
 * Users chat, general and local (game chat)
 * */
class Chats {

  /**
   * Get messages from general chat
   * @param {string} token: token for authorization
   * @param {number} limit: how many messages are getting from the database
   * @param {number} offset: messages position in database
   * @param {boolean} isEntered: if don't need to check token
   * */
  static async getMessagesGeneralChat({ token, limit = 50, offset = 0 }, isEntered = false) {
    if (!isEntered) {
      const per = await User.permissionsToken(token);
      if (per.status) return per;
    }

    const { rows, err } = await db.query(GET_MESSAGES(), [limit, offset]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: rows,
      status: 200,
    }
  }


  /**
   * Get messages from local chat
   * @param {string} token: token for authorization
   * @param {number} game_id: id game
   * @param {number} limit: how many messages are getting from the database
   * @param {number} offset: messages position in database
   * @param {boolean} isEntered: if don't need to check token
   * */
  static async getMessagesLocalChat({ token, game_id, limit = 50, offset = 0 }, isEntered = false) {
    if (!isEntered) {
      const per = await User.permissionsToken(token);
      if (per.status) return per;
    }

    if (!game_id) {
      return {
        err: `game_id is undefined`,
        status: 404,
      }
    }

    const { rows, err } = await db.query(GET_MESSAGES(true), [limit, offset, game_id]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: rows,
      status: 200,
    }
  }


  /**
   * Get messages from general chat
   * @param {string} token: token for authorization
   * @param {string} message: message
   * */
  static async insertMessageGeneralChat({ token, message }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    if (!message) {
      return {
        err: `message is undefined.`,
        status: 404,
      }
    }

    const { id, username } = per;
    const time = Helpers.getUnixTimeNow();

    const { err } = await db.query(INSERT_MESSAGE(), [id, message, time]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: { username, message, time },
      status: 201,
    }
  }


  /**
   * Get messages from general chat
   * @param {string} token: token for authorization
   * @param {string} message: message
   * @param {number} game_id: id game
   * */
  static async insertMessageLocalChat({ token, message, game_id }) {
    let per = await User.permissionsToken(token);
    if (per.status) return per;

    if (!game_id || !message) {
      return {
        err: `game_id or message are undefined.`,
        status: 404,
      }
    }

    const { id, username } = per;
    const time = Helpers.getUnixTimeNow();

    const { err } = await db.query(INSERT_MESSAGE(true), [id, message, time, game_id]);

    if (err) {
      return {
        err: err.message,
        status: 400,
      };
    }

    return {
      data: { username, message, time },
      status: 201,
    }
  }
}


module.exports = Chats;