import { INIT_START, MAKE_MOVE, GIVE_UP, CREATE_ROOM } from "../constants/ActionTypes";

function getDefaultTable() {
  return "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2";
}

function getInitTable() {
  return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
}


export function fen(state = "", action) {
  switch (action.type) {
    case CREATE_ROOM:
      return getInitTable();

    //TODO: unimplemented yet
    case GIVE_UP:
      return state

    case INIT_START:
      return getDefaultTable();

    case MAKE_MOVE:
      //console.log("MAKE_MOVE:ChessboardReducer ", state, action.payload);
      return action.payload;

    default:
      return state;
  }
}
