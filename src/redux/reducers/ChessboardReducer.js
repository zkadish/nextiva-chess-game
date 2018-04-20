import { INIT_START, MAKE_MOVE, GIVE_UP, CREATE_ROOM, MAKE_MOVE_UPDATE } from "../constants/ActionTypes";

/* 
{
  first_player,
  second_player,
  role,
  fen,
  time,
  makeMove,
  isGiveUp
}
 */
export function fen(state = "", action) {
  switch (action.type) {
    // case CREATE_ROOM:
    //   return getInitTable();

    //TODO: unimplemented yet
    case GIVE_UP:
      return state

    // case INIT_START:
    //   return getDefaultTable();

    case MAKE_MOVE:
      //console.log("MAKE_MOVE:ChessboardReducer ", state, action.payload);
      return action.payload;

    case MAKE_MOVE_UPDATE://payload is  {username, state, time, is_give_up }
      const {username: makeMove, state: fen, time, is_give_up: isGiveUp} = action.payload;
      return {
        ...state,
        fen,
        makeMove,
        time,
        isGiveUp
      };

    default:
      return state;
  }
}
