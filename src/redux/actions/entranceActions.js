import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM, CREATE_ROOM_REQUEST, JOIN_ROOM_REQUEST, WATCH_ROOM_REQUEST, ROOMS_LIST } from "../constants/ActionTypes";

//TODO: implement in component to dispatch on click handler
export const createRoomRequest = (creatorId) => ({
  type: CREATE_ROOM_REQUEST,
  payload: {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    player1: creatorId
  }
});

//TODO: implement in component to dispatch on click handler
export const createJoinRequest = (room_id) => ({
  type: JOIN_ROOM_REQUEST,
  payload: room_id
})

//TODO: implement in component to dispatch on click handler
export const createWatchRoomRequest = (room_id) => ({
  type: WATCH_ROOM_REQUEST,
  payload: room_id
})

export const createRoom = (fen) => ({
  type: CREATE_ROOM,
  payload: fen
});

export const roomsList = (rooms) => ({
  type: ROOMS_LIST,
  payload: rooms
});

export const joinRoom = (counter, value) => dispatch => {
  setTimeout(() => {dispatch(join());}, 500);
};

export const watchRoom = (counter, value) => dispatch => {
  setTimeout(() => {dispatch(watch());}, 500);
};

function watch(value) {
  return {
    type:WATCH_ROOM,
    payload: value
  }
}
function create(value) {
  console.log('create', value)
  return {
    type:CREATE_ROOM,
    payload: value
  }
}
function join(value) {
  return {
    type:JOIN_ROOM,
    payload: value
  }
}