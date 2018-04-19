import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM, CREATE_ROOM_REQUEST, JOIN_ROOM_REQUEST, WATCH_ROOM_REQUEST, ROOMS_LIST } from "../constants/ActionTypes";
import {ROUTE} from '../../redux/constants/route';

export const createRoomRequest = () => ({
  type: CREATE_ROOM_REQUEST,
  payload: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
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

export const createRoom = (fen) => ({
  type: CREATE_ROOM,
  payload: fen
});

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
