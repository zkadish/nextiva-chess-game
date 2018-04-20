module.exports = {

  GET_MESSAGES: (game_id) => `
    SELECT
      u.username,
      m.message,
      m.time
    FROM messages AS m
    JOIN users AS u ON u.id = m.user_id
    WHERE m.game_id ${ game_id ? '= $3' : 'IS NULL' }
    ORDER BY m.time DESC
    LIMIT $1
    OFFSET $2
    `,

  INSERT_MESSAGE: (game_id) => `
    INSERT INTO messages
      (user_id, message, time ${ game_id ? ', game_id' : '' })
    VALUES ($1, $2, $3 ${ game_id ? ', $4' : '' })
    `,
  
};