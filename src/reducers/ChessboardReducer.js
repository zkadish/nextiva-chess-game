import {INIT_START} from "../constants/ActionTypes";

//TODO: need to describe DEFAULT_STATE better
const DEFAULT_STATE = undefined;

function getDefaultTable() {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  let finalArray = [];
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      finalArray.push((letters[i] + numbers[j]).toString());
    }
    finalArray.push("BR"); //adding temporarty separators
  }
  return finalArray;
}


export function chessboard(state = DEFAULT_STATE, action) {

  switch (action.type) {
    
  case INIT_START:
    return getDefaultTable();
    
  default:
    return "return default type";
  }
}