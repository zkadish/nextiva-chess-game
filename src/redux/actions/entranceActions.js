import { CREATE_ROOM, JOIN_ROOM, WATCH_ROOM } from "../constants/ActionTypes";

//Temporartily added delay for server response delay simulation

export const createRoom = (page, value) => dispatch => {
  setTimeout(() => {dispatch(create());}, 500);
};

export const joinRoom = (page, value) => dispatch => {
  setTimeout(() => {dispatch(join());}, 500);
};

export const watchRoom = (page, value) => dispatch => {
  setTimeout(() => {dispatch(watch());}, 500);
};

function watch(value) {
  return {
    type:WATCH_ROOM,
    payload: value
  }
}
function create(value) {
  return {
    type:CREATE_ROOM,
  }
}
function join(value) {
  return {
    type:JOIN_ROOM,
    payload: value
  }
}