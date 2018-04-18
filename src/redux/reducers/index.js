import { combineReducers } from "redux";
import { fen } from "./ChessboardReducer";
import { playstate } from "./entranceReducer";

export default combineReducers({ fen, playstate });
