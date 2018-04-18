import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import rootSaga from './saga'
import {createLogger} from "redux-logger"

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  collapsed: true
});

const enhancer = applyMiddleware(sagaMiddleware, logger)

const store = createStore(
  () => {},
  enhancer
)
// window.store = store //only for debugging

//sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker()
