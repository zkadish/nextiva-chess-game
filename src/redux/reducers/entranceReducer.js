import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM ,ROOMS_LIST, UPDATE_ROOM_STATE } from "../constants/ActionTypes";
import { ROLE_WATCHER, ROLE_BLACK, ROLE_WHITE, } from "../constants/roles";

export function playstate(state = "", action) {
  switch (action.type) {

    case ROOMS_LIST:
    return { ...state, state: action.payload };

    case UPDATE_ROOM_STATE:
      debugger;
      return {
        ...state,
        fen: action.payload.state,
        first_player: action.payload.first_player,
        second_player: action.payload.second_player,
        time: action.payload.time,
      };

    case CREATE_ROOM:
    debugger
      return {
        ...state,
        fen: action.payload.fen,
        first_player: action.payload.first_player, 
        role: ROLE_WHITE
      };

    case WATCH_ROOM:
      return {
        ...state,
        role: ROLE_WATCHER
      };
    
    case JOIN_ROOM:
      return {
        ...state,
        state: action.payload,
        role: ROLE_BLACK
      };

    default:
      return state;
  }
}
