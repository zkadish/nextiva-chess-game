import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import store from "./redux/store/store"

<<<<<<< HEAD
window.store = store //only for debugging
=======
const store = createStore(
  () => {},
  enhancer
)
// window.store = store //only for debugging

sagaMiddleware.run(rootSaga)
>>>>>>> server

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker()


// store.dispatch({type:"room.create"})
