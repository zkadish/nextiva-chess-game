import { INIT_START } from '../constants/ActionTypes';
import Chess from "chess.js";
import chessHelper from "../../utills/ChessHelper";

//TODO: need to describe DEFAULT_STATE better

const DEFAULT_STATE = undefined;
const DEFAULT_FIGURES = [];

function getDefaultTable(figures=[]) {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  let finalArray = [];
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      finalArray.push({
        position: (letters[i] + numbers[j]).toString(),
        title: "e",
        color: "none"
      });
    }
  }
  

  return finalArray;
}

// chessHelper.putFigure("test");

// var chess = new Chess();
// chess.clear();
// chess.put({ type: chess.PAWN, color: chess.BLACK }, 'e2') // put a black pawn on a5
// console.log(chess.ascii())
// console.log(chess.fen())

export function chessboard(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INIT_START:
      return getDefaultTable(DEFAULT_FIGURES);

    default:
      return "return default type";
  }
}
