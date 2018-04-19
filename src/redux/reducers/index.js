import { combineReducers } from "redux";
import { fen } from "./ChessboardReducer";
import { playstate } from "./entranceReducer";
import user from './user';
import route from './route';
import signin from './signin';
import signup from './signup';

export default combineReducers({ playstate, user, signup, signin, fen, route });
