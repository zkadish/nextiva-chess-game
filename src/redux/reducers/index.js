import { combineReducers } from "redux";
import { fen } from "./ChessboardReducer";
import { playstate } from "./entranceReducer";
import user from './user';

export default combineReducers({ playstate, user, fen });
