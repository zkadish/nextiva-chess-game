import { INIT_START, MAKE_MOVE, GIVE_UP, CREATE_ROOM } from "../constants/ActionTypes";

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

    default:
      return state;
  }
}
