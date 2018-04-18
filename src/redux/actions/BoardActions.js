import { INIT_START, MAKE_MOVE, GIVE_UP } from "../constants/ActionTypes";

export const initializeBoard = (counter, value) => dispatch => {
  dispatch(initBoard());
};

export const makeMove = (counter, value) => dispatch => {
  dispatch(move(counter));
}

export const giveUp = (counter, value) => dispatch => {
   dispatch(giveU());
}

function giveU() {
  return { type: GIVE_UP }
}

function initBoard() {
  return { type: INIT_START }
}

function move(value) {
  return {
    type: MAKE_MOVE,
    payload: value
  };
}