import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM ,ROOMS_LIST, UPDATE_ROOM_STATE, MAKE_MOVE_UPDATE } from "../constants/ActionTypes";
import { ROLE_WATCHER, ROLE_BLACK, ROLE_WHITE, } from "../constants/roles";

export function playstate(state = "", action) {
  switch (action.type) {

    case ROOMS_LIST:
    return { ...state, state: action.payload };

    case UPDATE_ROOM_STATE:
      return {
        ...state,
        fen: action.payload.state,
        first_player: action.payload.first_player,
        second_player: action.payload.second_player,
        time: action.payload.time,
      };

    case CREATE_ROOM: {
      const {date, id, state: fen, time, first_player} = action.payload;
      return {
        ...state,
        date,//when room was created
        id,//roomid
        fen,
        time,//main time for players
        first_player, 
        role: ROLE_WHITE
      };
    }
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

      case MAKE_MOVE_UPDATE: {//payload is  {username, state, time, is_give_up }
        const {username: makeMove, state: fen, time, is_over: isOver} = action.payload;
        return {
          ...state,
          fen,
          makeMove,
          time,
          isOver
        };
      }
    default:
      return state;
  }
}
