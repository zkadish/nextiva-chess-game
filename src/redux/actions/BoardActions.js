import { INIT_START } from "../constants/ActionTypes";

//TODO: implement this instead direct dispatch
export function initializeBoard() {
  return (dispatch) => {
    type: INIT_START
  }
}

