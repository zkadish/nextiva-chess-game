import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk ));

export default store;
