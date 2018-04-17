import { INIT_START } from '../constants/ActionTypes';
import Chess from "chess.js";
import chessHelper from "../../utills/ChessHelper";

//TODO: need to describe DEFAULT_STATE better

const DEFAULT_STATE = undefined;
const DEFAULT_FIGURES = [];

function getDefaultTable() {
  console.log('getDefaultTable')
  return 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2';
}

// chessHelper.putFigure("test");

// var chess = new Chess();
// chess.clear();
// chess.put({ type: chess.PAWN, color: chess.BLACK }, 'e2') // put a black pawn on a5
// console.log(chess.ascii())
// console.log(chess.fen())

export function fen(state, action) {
  console.log('reducer - fen()', action)
  switch (action.type) {
    case INIT_START:
      return getDefaultTable();

    default:
      return "return default type";
  }
}
