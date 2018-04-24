import { combineReducers } from "redux";
import { playstate } from "./entranceReducer";
import rooms from './rooms';
import user from './user';
import route from './route';
import signin from './signin';
import signup from './signup';
import {chat} from './chat'

const appReducer = combineReducers({ chat , playstate, user, signup, signin, route, rooms });
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action)
}
export default rootReducer;