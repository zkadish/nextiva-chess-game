module.exports = {

  GET_ALL_LIST: `
    SELECT 
      g.id,
      uf.username AS first_player,
      (
        SELECT 
          username 
        FROM users 
        WHERE id = g.second_player_id
      ) AS second_player
    FROM games AS g
    JOIN users AS uf ON uf.id = g.first_player_id
    WHERE is_give_up = false
    `,

  CREATE_GAME: `INSERT INTO games (first_player_id, initial_state, time) VALUES ($1, $2, $3) RETURNING id`,

  GET_GAME_BY_PLAYER_ID: `SELECT * FROM games WHERE first_player_id = $1`,

  GET_GAME_BY_ID: `
    SELECT 
      g.id,
      g.initial_state,
      g.time,
      uf.username AS first_player,
      (
        SELECT 
          username 
        FROM users
        WHERE id = g.second_player_id
      ) AS second_player
    FROM games AS g
    JOIN users AS uf ON uf.id = g.first_player_id
    WHERE g.id = $1 AND is_give_up = false
    `,

  GET_GAME_BY_ID_PLAYER: `SELECT * FROM games WHERE $1 = first_player_id AND is_give_up = false`,

  CONNECT_TO_GAME: `UPDATE games SET second_player_id = $1, time = $2 WHERE id = $3`,

  GET_LAST_STATE_BY_ID_GAME: `
    SELECT
      u.username,
      h.state, 
      h.time
    FROM history AS h
    JOIN users AS u ON u.id = h.player_id
    WHERE game_id = $1
      order by h.id desc limit 1
    `,

};