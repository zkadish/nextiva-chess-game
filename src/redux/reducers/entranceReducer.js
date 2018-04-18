import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM } from "../constants/ActionTypes";
import { ROLE_WATCHER, ROLE_BLACK, ROLE_WHITE } from "../constants/roles";

export function playstate(state = '', action) {
  switch (action.type) {

    case CREATE_ROOM:
    case WATCH_ROOM:
    case JOIN_ROOM:
      return {...state, state: action.payload};

    default:
      return state;
  }
}
