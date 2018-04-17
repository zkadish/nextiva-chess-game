import { combineReducers } from "redux";
import { fen } from "./ChessboardReducer";
import { foobar } from "./entranceReducer";

export default combineReducers({ fen, foobar });
