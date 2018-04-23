import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM, CREATE_ROOM_REQUEST, JOIN_ROOM_REQUEST, WATCH_ROOM_REQUEST, ROOMS_LIST, UPDATE_ROOM_STATE, MAKE_MOVE_UPDATE, MAKE_MOVE, GIVE_UP, EXIT, ROOM_LEAVE } from "../constants/ActionTypes";
import {ROUTE} from '../../redux/constants/route';

export const createRoomRequest = (playerName = 'UNKNOWN') => ({
  type: CREATE_ROOM_REQUEST,
  payload:{
    fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    first_player: playerName
  }
});

export const createJoinRequest = (room_id) => ({
  type: JOIN_ROOM_REQUEST,
  payload: room_id
})

export const createWatchRoomRequest = (room_id) => {
  return {
  type: WATCH_ROOM_REQUEST,
  payload: room_id
}}

export const createRoom = (payload) => {
  return{
  type: CREATE_ROOM,
  payload
}};

export const route = (payload) => ({
  type:ROUTE,
  payload,
})

export const roomsList = (rooms) => ({
  type: ROOMS_LIST,
  payload: rooms
});

export const joinRoom = (payload) => ({
  type:JOIN_ROOM,
  payload,
});

export const watchRoom = (payload) => ({
  type:WATCH_ROOM,
  payload,
});

export const makeMove = (game_id, fen, is_over) => ({
  type:MAKE_MOVE,
  payload: {
    game_id,
    state: fen,
    is_over
  }
});

export const giveUp = (game_id) => ({
  type: GIVE_UP,
  payload: {
    game_id,
    // state: fen,
    // is_over
  }
})

export const exit = (game_id) => ({
  type: EXIT,
  payload: {
    game_id,
    // state: fen,
    // is_over
  }
})

export  const roomLeave = (username) => ({
  type:ROOM_LEAVE,
  payload: username
})

export const updateRoomState = (payload) => ({
  type:UPDATE_ROOM_STATE,
  payload,
});

export const makeMoveUpdate = (payload) => ({//payload is  {username, state, time, is_give_up }
  type: MAKE_MOVE_UPDATE,
  payload,
});