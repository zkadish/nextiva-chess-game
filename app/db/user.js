module.exports = {

  GET_USER_DB: (param, where) => `SELECT * FROM users WHERE ${param} = $1 ${where ? where : ''}`,

  INSERT_USER_DB: 'INSERT INTO users (email, username, token, hash, salt) VALUES ($1, $2, $3, $4, $5)',

};