import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM } from "../constants/ActionTypes";
import { ROLE_WATCHER, ROLE_BLACK, ROLE_WHITE } from "../constants/roles";

export function playstate(state = '', action) {
  switch (action.type) {

    case CREATE_ROOM:
      //TODO: not implemented yet, need to discuss
      return action.payload;

    //mock, currently actions are same
    case WATCH_ROOM:
      return {
        player1: "Player One",
        player2: "Player Two",
        watchers: ["Watcher One", "Watcher Two"],
        currentPlayerRole: ROLE_WATCHER 
        // fen: "r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19"
      };

    case JOIN_ROOM:
      return {
        player1: "Player One",
        player2: "Player Two",
        watchers: ["Watcher One", "Watcher Two"],
        currentPlayerRole: ROLE_BLACK 
        // fen: "r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19"
      };

    default:
      return state;
  }
}
