import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import reducers from './redux/reducers'
import rootSaga from './saga'
import setupSocket from './sockets'
import username from './utils/name'

import {createLogger} from "redux-logger"
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  collapsed: true
});

const enhancer = applyMiddleware(sagaMiddleware, thunk, logger)

const store = createStore(
  reducers,
  enhancer
)
window.store = store //only for debugging

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
