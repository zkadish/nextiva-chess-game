module.exports = {

  GET_ALL_HISTORY: `
    SELECT
      COALESCE(sum(h.time), 0) AS total,
      g.time AS start_time
    FROM history AS h
    JOIN games AS g ON g.id = h.game_id
    WHERE h.game_id = $1
    GROUP BY start_time
    `,

  GET_GAME_BY_ID : `SELECT time FROM games WHERE id = $1`,

  INSERT_STATE_CHESS: `
    INSERT INTO history 
      (game_id, player_id, state, time, give_up) 
    VALUES ($1, $2, $3, $4, $5)
    `,

  UPDATE_GIVE_UP: `
    UPDATE games 
    SET is_give_up = true 
    WHERE 
      id = $1 
      AND (first_player_id = $2 OR second_player_id = $2)
    `,
};