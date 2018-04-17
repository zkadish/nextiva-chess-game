import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import reducers from './redux/reducers'
import handleNewMessage from './saga'
import setupSocket from './sockets'
import username from './utils/name'

import {createLogger} from "redux-logger"

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  reducers,
  applyMiddleware(logger, sagaMiddleware)
)

const socket = setupSocket(store.dispatch, username)

sagaMiddleware.run(handleNewMessage, { socket, username })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
