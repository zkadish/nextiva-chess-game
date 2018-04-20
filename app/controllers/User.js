const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addSalt = '‘ß˚ç';


const {
  GET_USER_DB,
  INSERT_USER_DB,
} = require('../db/user');



class User {

  /**
   * Permissions for condition user by request with headers Authorization
   * @param {Request} req
   * @param {Response} res
   * @return {boolean|User} false - if token is wrong, User - object
   * */
  static async permissions(req, res) {
    const { rows, err } = await db.query(GET_USER_DB('token'), [req.token]);

    if (err) {
      res.status(400).json(err.message);
      return false;
    }

    if (rows.length === 0) {
      res.status(401).json('');
      return false;
    }

    return rows[0];
  }


  /**
   * Permissions for condition user by token
   * @param {string} token: token for authorization
   * @return {object|User} object - if token is wrong, User - object
   * */
  static async permissionsToken(token) {
    const { rows, err } = await db.query(GET_USER_DB('token'), [token]);

    if (err || !token) {
      return {
        err: err ? err.message : 'You need to send token',
        status: 400,
      };
    }

    if (rows.length === 0) {
      return {
        err: 'Incorrect token.',
        status: 401,
      };
    }

    return rows[0];
  }


  /**
   * Sign up user
   * @param {Request} req, { email, username, password, repeat_password }
   * @param {Response} res
   * @return {object} token is string
   * */
  static async signUpUser(req, res) {
    const { body } = req;
    let answer = await User._conditionUser(body);

    if (answer.err) {
      res.status(400).json(answer.err.message);
      return;
    }

    if (answer.rows.length !== 0) {
      res.status(400).json(`This email ${body.email} is exist.`);
      return;
    }

    const { email, username, password } = body;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password + addSalt, salt);
    const token = User.getToken(email, username, hash);

    answer = await db.query(INSERT_USER_DB, [email, username, token, hash, salt]);

    if (answer.err) {
      res.status(400).json(answer.err.message);
      return;
    }

    res.json({ token }); // email, username,
  }


  /**
   * Sign in user
   * @param {Request} req, {email, password}
   * @param {Response} res
   * @return {object} token is string
   * */
  static async signInUser(req, res) {
    const { email, password } = req.body;
    const { rows, err } = await db.query(GET_USER_DB('email', 'OR username = $1'), [email]);

    if (err) {
      res.status(400).json(err.message);
      return;
    }

    if (rows.length === 0) {
      res.status(400).json(`This email ${email} isn't exist.`);
      return;
    }

    const user = rows[0];
    if (bcrypt.compareSync(password + addSalt, user.hash)) {
      res.json({ email: user.email, username: user.username, token: user.token }); // email: user.email,
    } else {
      res.status(400).json('Wrong password.');
    }
  }


  /**
   * Get token
   * @param {string} email
   * @param {string} username
   * @param {string} hash
   * @return {string} token
   * */
  static getToken(email, username, hash) {
    return jwt.sign({
      email,
      username
    }, process.env.JWT_SECRET + hash || 'M7BUb2Oyhll2ciPsWKQw0KZPJ9CEoc9gcVpVb1uaVCVyHKTB9XiJs0BTngtep45' + hash);
  }


  /**
   * Condition user by params for sign up
   * @param {object} email
   * @param {string} username
   * @param {string} password
   * @param {string} repeat_password
   * @return {boolean|User}
   * */
  static async _conditionUser({ email, username, password, repeat_password }) {
    return new Promise(resolve => {
      if (typeof(email) !== 'string'
        || !User.validateEmail(email)
        || typeof(username) !== 'string'
        || username.length < 6
        || typeof(password) !== 'string'
        || typeof(repeat_password) !== 'string'
        || password !== repeat_password
        || password.length < 8) {
        resolve({ err: { message: 'Name, email or pass are wrong' } });
      }

      resolve(db.query(GET_USER_DB('email'), [email]));
    });
  }


  /**
   * Validate email
   * @param {string} email
   * @return {boolean} check email by regex
   * */
  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}


module.exports = User;
