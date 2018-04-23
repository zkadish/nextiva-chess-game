import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'
// import registerServiceWorker from './registerServiceWorker'

import store from "./redux/store/store"

import './index.scss';

window.store = store //only for debugging

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker()


// store.dispatch({type:"room.create", payload: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"})
