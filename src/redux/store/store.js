import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import { createLogger } from "redux-logger";

import rootReducer from "../reducers/index";
import rootSaga from '../../saga'


const logger = createLogger({
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, thunk, logger)); //NB: middleware arrangement is importrant

sagaMiddleware.run(rootSaga)

export default store;
