import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM } from "../constants/ActionTypes";

export function foobar(state = '', action) {
  switch (action.type) {

    case CREATE_ROOM:
      //TODO: not implemented yet, need to discuss
      return "WOW, DEFAULT foobar() from CREATE_ROOM";

    //mock, currently actions are same
    case WATCH_ROOM:
    case JOIN_ROOM:
      return {
        player1: "Player One",
        player2: "Player Two",
        watchers: ["Watcher One", "Watcher Two"],
        // fen: "r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19"
      };

    default:
      return state;
  }
}
