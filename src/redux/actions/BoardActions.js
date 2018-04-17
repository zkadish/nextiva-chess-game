import { INIT_START, MAKE_MOVE } from "../constants/ActionTypes";

export const initializeBoard = (page, value) => dispatch => {
  dispatch({ type: INIT_START });
};


export const makeMove = (page, value) => dispatch => {
  dispatch(move(page));
}

function move(value) {
  return {
    type: MAKE_MOVE,
    payload: value
  };
}