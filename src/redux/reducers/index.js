import { combineReducers } from "redux";
import { playstate } from "./entranceReducer";
import rooms from './rooms';
import user from './user';
import route from './route';
import signin from './signin';
import signup from './signup';

export default combineReducers({ playstate, user, signup, signin, route, rooms });
