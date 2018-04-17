const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addSalt = '‘ß˚ç';

const GET_USER_DB = (param) => `SELECT * FROM users WHERE ${param} = $1`;
const INSERT_USER_DB = 'INSERT INTO users (email, username, token, hash, salt) VALUES ($1, $2, $3, $4, $5)';

class User {
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


  static async permissionsToken(token) {
    const { rows, err } = await db.query(GET_USER_DB('token'), [token]);

    if (err) {
      return {

      };
    }
  }


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


  static async signInUser(req, res) {
    const { email, password } = req.body;
    const { rows, err } = await db.query(GET_USER_DB('email'), [email]);

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
      res.json({ username: user.username, token: user.token }); // email: user.email,
    } else {
      res.status(400).json('Wrong password.');
    }
  }


  static getToken(email, username, hash) {
    return jwt.sign({
      email,
      username
    }, process.env.JWT_SECRET + hash || 'M7BUb2Oyhll2ciPsWKQw0KZPJ9CEoc9gcVpVb1uaVCVyHKTB9XiJs0BTngtep45' + hash);
  }


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


  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}


module.exports = User;
