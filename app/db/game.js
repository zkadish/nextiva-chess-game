module.exports = {

  GET_ALL_HISTORY: `
    SELECT
      COALESCE(sum(h.time), 0) AS total
    FROM history AS h
    WHERE h.game_id = $1 AND h.player_id = $2
    `,

  GET_GAME_BY_ID : `SELECT time, first_player_id, second_player_id FROM games WHERE id = $1`,

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